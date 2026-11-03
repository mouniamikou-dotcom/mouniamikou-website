const {validateEnquiry}=require('./enquiry-validation.cjs');
const {notification}=require('./preview-enquiry.cjs');
const HOSTS=new Set(['mouniamikou.com','www.mouniamikou.com']);
function publicConfiguration(env) {
 const enabled=env.VERCEL_ENV==='production' && env.NEXT_PUBLIC_SANITY_DATASET==='production' && env.PUBLIC_ENQUIRY_ENABLED==='true' && Boolean(env.RESEND_API_KEY && env.RESEND_FROM_EMAIL && env.RECAPTCHA_SECRET_KEY && env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
 return {enabled,mode:'public'};
}
// Per-instance burst protection complements reCAPTCHA; it is not a distributed quota.
function createBurstLimiter(now=()=>Date.now()) {
 const entries=new Map();
 return key=>{
  const time=now();for(const [id,v] of entries)if(v.until<=time)entries.delete(id);
  const value=entries.get(key);
  if(value && value.count>=5)return false;
  if(!value && entries.size>=10000)return false;
  entries.set(key,{count:(value?.count||0)+1,until:value?.until||time+600000});return true;
 };
}
function createPublicHandler({env,verify,deliver,allow=createBurstLimiter()}) {
 return async request=>{
  const respond=(status,body)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
  if(!publicConfiguration(env).enabled)return respond(503,{success:false,code:'PREVIEW_DISABLED'});
  const url=new URL(request.url);
  if(url.protocol!=='https:' || !HOSTS.has(url.hostname) || request.headers.get('origin')!==url.origin)return respond(403,{success:false});
  if(!request.headers.get('content-type')?.startsWith('application/json'))return respond(415,{success:false});
  if(Number(request.headers.get('content-length'))>24000)return respond(413,{success:false});
  let body;try{const text=await request.text();if(Buffer.byteLength(text)>24000)return respond(413,{success:false});body=JSON.parse(text);}catch{return respond(400,{success:false});}
  if(!body || typeof body!=='object' || body.website || !['fr','en'].includes(body.language))return respond(403,{success:false});
  const result=validateEnquiry(body);if(!result.ok)return respond(422,{success:false,errors:result.errors});
  if(typeof body.requestId!=='string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.requestId))return respond(400,{success:false});
  if(typeof body.recaptchaToken!=='string' || !body.recaptchaToken || body.recaptchaToken.length>5000)return respond(403,{success:false});
  const {createHash}=require('node:crypto');
  const fingerprint=createHash('sha256').update(result.data.email.toLowerCase()).digest('hex');
  if(!allow(fingerprint))return respond(429,{success:false,code:'RATE_LIMITED'});
  try{
   if(!await verify(body.recaptchaToken,url.hostname,'enquiry'))return respond(403,{success:false,code:'ANTISPAM_REJECTED'});
   const payload=notification(result.data,'CONTACT',env.RESEND_FROM_EMAIL);
   payload.email.subject=payload.email.subject.replace(/^CONTACT-[^|]+\| /,'');
   const sent=await deliver(payload.email,{idempotencyKey:'contact/'+body.requestId});
   if(sent?.error || !sent?.data?.id)return respond(502,{success:false,code:'DELIVERY_FAILED'});
   return respond(200,{success:true});
  }catch{return respond(502,{success:false,code:'DELIVERY_FAILED'});}
 };
}
module.exports={publicConfiguration,createPublicHandler,createBurstLimiter};
