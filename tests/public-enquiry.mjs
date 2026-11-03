import test from 'node:test';
import assert from 'node:assert/strict';
import {createPublicHandler,publicConfiguration,createBurstLimiter} from '../src/lib/public-enquiry.cjs';
import {workingSanityConfig} from '../src/sanity/policy.cjs';
import {privateReadConfig} from '../src/sanity/lib/read-policy.cjs';
const env={VERCEL_ENV:'production',NEXT_PUBLIC_SANITY_DATASET:'production',PUBLIC_ENQUIRY_ENABLED:'true',RESEND_API_KEY:'fake',RESEND_FROM_EMAIL:'fake@example.com',RECAPTCHA_SECRET_KEY:'fake',NEXT_PUBLIC_RECAPTCHA_SITE_KEY:'fake'};
const body={language:'fr',service:'corporate',fullName:'Fictitious Test',email:'fictitious@example.com',description:'Fictitious legal enquiry',privacyAccepted:true,recaptchaToken:'fake',requestId:'12345678-1234-4123-8123-123456789abc',answers:{}};
const req=(data=body,host='mouniamikou.com',origin='https://'+host)=>new Request('https://'+host+'/api/enquiry',{method:'POST',headers:{origin,'content-type':'application/json'},body:JSON.stringify(data)});
const forbidden=()=>{throw Error('No external calls');};
test('public contact is closed in previews and with missing configuration',async()=>{
 for(const changes of [{VERCEL_ENV:'preview'},{PUBLIC_ENQUIRY_ENABLED:'false'},{NEXT_PUBLIC_SANITY_DATASET:'refonte_fr_en'},{RECAPTCHA_SECRET_KEY:''},{NEXT_PUBLIC_RECAPTCHA_SITE_KEY:''}]){
  const e={...env,...changes};assert.equal(publicConfiguration(e).enabled,false);assert.equal((await createPublicHandler({env:e,verify:forbidden,deliver:forbidden})(req())).status,503);
 }
});
test('production reads are published, anonymous, and forbidden to previews',()=>{
 assert.equal(workingSanityConfig('bfaunxy0','production','production').dataset,'production');
 assert.throws(()=>workingSanityConfig('bfaunxy0','production','preview'));
 assert.deepEqual(privateReadConfig(undefined,'production','production'),{useCdn:true,perspective:'published'});
 assert.throws(()=>privateReadConfig(undefined,'production','preview'));
});
test('both languages and all categories send only to cabinet with public anti-spam action',async()=>{
 for(const language of ['fr','en'])for(const service of ['formation','corporate','property','immigration','other']){
 let email,options;const handler=createPublicHandler({env,verify:async(token,host,action)=>{assert.equal(action,'enquiry');assert.equal(host,'mouniamikou.com');return true;},deliver:async(e,o)=>{email=e;options=o;return{data:{id:'fake'}};}});
 assert.equal((await handler(req({...body,language,service}))).status,200);assert.equal(email.to,'mm@mouniamikou.com');assert.equal(email.replyTo,body.email);assert.equal(options.idempotencyKey,'contact/'+body.requestId);assert.ok(!email.subject.includes('AUDIT'));
 }
});
test('foreign origins, honeypot, missing privacy and malformed payload never send',async()=>{
 const handler=createPublicHandler({env,verify:forbidden,deliver:forbidden});
 assert.equal((await handler(req(body,'evil.example'))).status,403);
 assert.equal((await handler(req(body,'mouniamikou.com','https://evil.example'))).status,403);
 assert.equal((await handler(req({...body,website:'bot'}))).status,403);
 assert.equal((await handler(req({...body,privacyAccepted:false}))).status,422);
 assert.equal((await handler(req({...body,requestId:'bad'}))).status,400);
 assert.equal((await handler(req({...body,description:'x'.repeat(25000)}))).status,413);
});
test('rejected captcha, limiter, and provider failure cannot return success',async()=>{
 assert.equal((await createPublicHandler({env,verify:async()=>false,deliver:forbidden})(req())).status,403);
 assert.equal((await createPublicHandler({env,verify:forbidden,deliver:forbidden,allow:()=>false})(req())).status,429);
 for(const deliver of [async()=>({error:{}}),async()=>({data:{}}),async()=>{throw Error('failure');}])assert.equal((await createPublicHandler({env,verify:async()=>true,deliver})(req())).status,502);
});
test('burst limiter expires without persistent personal data',()=>{
 let now=0;const allow=createBurstLimiter(()=>now);for(let i=0;i<5;i++)assert.equal(allow('hash'),true);assert.equal(allow('hash'),false);now=600001;assert.equal(allow('hash'),true);
});
