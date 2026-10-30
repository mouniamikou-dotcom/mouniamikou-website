import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const {createHandler,testConfiguration,TEST_HOST}=createRequire(import.meta.url)('../src/lib/preview-enquiry.cjs');
const now=Date.parse('2026-10-30T16:00:00Z');
const env={VERCEL_ENV:'preview',VERCEL_GIT_COMMIT_REF:'work/refonte-fr-en-2026-10-29',NEXT_PUBLIC_SANITY_DATASET:'refonte_fr_en',PREVIEW_ENQUIRY_TEST_ENABLED:'true',PREVIEW_ENQUIRY_TEST_BATCH:'AUDIT-NOTIF-3010-TEST',PREVIEW_ENQUIRY_TEST_EXPIRES_AT:new Date(now+1800000).toISOString(),RESEND_API_KEY:'fake-test-placeholder',RESEND_FROM_EMAIL:'test@example.com',RECAPTCHA_SECRET_KEY:'fake-test-placeholder'};
const data=(service='formation',language='fr')=>({language,service,fullName:'AUDIT Élodie Test',email:`audit+${service}-${language}@example.com`,description:'AUDIT Création et échanges fictifs',privacyAccepted:true,recaptchaToken:'fake-antispam-test-token',answers:{}});
const req=(body,host=TEST_HOST,origin=`https://${TEST_HOST}`)=>new Request(`https://${host}/api/enquiry`,{method:'POST',headers:{origin,'Content-Type':'application/json'},body:JSON.stringify(body)});
const forbidden=()=>{throw Error('External service must not be called');};
for(const language of ['fr','en'])for(const service of ['formation','corporate','property','immigration','other'])test(`notification contract ${language}/${service}`,async()=>{
 let sent;const handler=createHandler({env,now:()=>now,verify:async()=>true,deliver:async(email,options)=>{sent={email,options};return{data:{id:'fake-id'}};}});
 const response=await handler(req(data(service,language)));assert.equal(response.status,200);assert.equal((await response.json()).success,true);
 assert.equal(sent.email.to,'mm@mouniamikou.com');assert.equal(sent.email.replyTo,`audit+${service}-${language}@example.com`);assert.ok(sent.email.text.includes('Élodie'));assert.ok(sent.email.subject.includes(service.toUpperCase()));assert.equal(sent.options.idempotencyKey,`${env.PREVIEW_ENQUIRY_TEST_BATCH}/${service}/${language}`);
});
test('scope and time guards fail closed before parsing or external calls',async()=>{
 for(const overrides of [{VERCEL_ENV:'production'},{VERCEL_ENV:'development'},{VERCEL_GIT_COMMIT_REF:'main'},{NEXT_PUBLIC_SANITY_DATASET:'production'},{PREVIEW_ENQUIRY_TEST_ENABLED:'false'},{PREVIEW_ENQUIRY_TEST_EXPIRES_AT:new Date(now-1).toISOString()},{PREVIEW_ENQUIRY_TEST_EXPIRES_AT:new Date(now+3600001).toISOString()},{RESEND_API_KEY:''}]){
  const handler=createHandler({env:{...env,...overrides},now:()=>now,verify:forbidden,deliver:forbidden});assert.equal((await handler(req(null))).status,503);
 }
 assert.deepEqual(testConfiguration({}),{enabled:false});
});
test('host, origin, honeypot, personal input and invalid language cannot send',async()=>{
 const handler=createHandler({env,now:()=>now,verify:forbidden,deliver:forbidden});
 for(const request of [req(data(),'example.com'),req(data(),TEST_HOST,'https://example.com'),req({...data(),website:'spam'}),req({...data(),email:'person@example.com'}),req({...data(),fullName:'Real person'}),req({...data(),language:'de'})])assert.equal((await handler(request)).status,403);
});
test('required server fields, malformed JSON and body size are checked',async()=>{
 const handler=createHandler({env,now:()=>now,verify:forbidden,deliver:forbidden});
 assert.equal((await handler(req({...data(),privacyAccepted:false}))).status,422);
 assert.equal((await handler(new Request(`https://${TEST_HOST}/api/enquiry`,{method:'POST',headers:{origin:`https://${TEST_HOST}`,'Content-Type':'application/json'},body:'{' }))).status,400);
 assert.equal((await handler(req({...data(),description:'x'.repeat(25000)}))).status,413);
});
test('anti-spam rejection cannot call delivery or report success',async()=>{
 const handler=createHandler({env,now:()=>now,verify:async()=>false,deliver:forbidden});assert.equal((await handler(req(data()))).status,403);
});
test('provider errors, exceptions or missing confirmation cannot report success',async()=>{
 for(const deliver of [async()=>({error:{message:'provider failed'}}),async()=>({data:{}}),async()=>{throw Error('network failure');}]){
  const handler=createHandler({env,now:()=>now,verify:async()=>true,deliver});const response=await handler(req(data()));assert.equal(response.status,502);assert.equal((await response.json()).success,false);
 }
});
test('masked answers are excluded and HTML is escaped',async()=>{
 let email;const handler=createHandler({env,now:()=>now,verify:async()=>true,deliver:async(payload)=>{email=payload;return{data:{id:'fake-id'}};}});
 await handler(req({...data('property'),description:'AUDIT <script>alert(1)</script>',answers:{transaction:'sell',financing:'1',activity:'hidden'}}));
 assert.ok(!email.text.includes('financement'));assert.ok(!email.text.includes('hidden'));assert.ok(!email.html.includes('<script>'));assert.ok(email.html.includes('&lt;script&gt;'));
});
test('retries use the same provider idempotency key across handler instances',async()=>{
 const keys=[];for(let i=0;i<2;i++){const handler=createHandler({env,now:()=>now,verify:async()=>true,deliver:async(payload,options)=>{keys.push(options.idempotencyKey);return{data:{id:'fake-id'}};}});await handler(req(data()));}assert.equal(keys[0],keys[1]);
});
