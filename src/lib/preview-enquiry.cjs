const {validateEnquiry}=require('./enquiry-validation.cjs');
const questions=require('../content/enquiry-conditional.json');
const TEST_HOST='mouniamikou-website-git-work-r-8a48e0-mounias-projects-b664613b.vercel.app';
const TEST_RECIPIENT='mm@mouniamikou.com';
const SERVICES={formation:['Création de société','Company formation'],corporate:['Accompagnement des sociétés','Corporate legal support'],property:['Immobilier','Real estate'],immigration:['Immigration','Immigration'],other:['Autre demande','Other enquiry']};
function testConfiguration(env,now=Date.now()) {
 const expires=Date.parse(env.PREVIEW_ENQUIRY_TEST_EXPIRES_AT || '');
 const enabled=env.VERCEL_ENV==='preview' && env.VERCEL_GIT_COMMIT_REF==='work/refonte-fr-en-2026-10-29' && env.NEXT_PUBLIC_SANITY_DATASET==='refonte_fr_en' && env.PREVIEW_ENQUIRY_TEST_ENABLED==='true' && /^[A-Z0-9-]{8,80}$/.test(env.PREVIEW_ENQUIRY_TEST_BATCH || '') && Number.isFinite(expires) && expires>now && expires-now<=60*60*1000 && Boolean(env.RESEND_API_KEY && env.RESEND_FROM_EMAIL && env.RECAPTCHA_SECRET_KEY);
 return {enabled,...(enabled?{batch:env.PREVIEW_ENQUIRY_TEST_BATCH,expiresAt:new Date(expires).toISOString()}: {})};
}
function notification(data,batch,from) {
 const fr=data.language==='fr';
 const service=SERVICES[data.service][fr?0:1];
 const lines=[`${fr?'Objet':'Subject'}: ${service}`,`${fr?'Langue':'Language'}: ${data.language.toUpperCase()}`,`${fr?'Nom':'Name'}: ${data.fullName}`,`Email: ${data.email}`];
 if(data.phone) lines.push(`${fr?'Téléphone':'Phone'}: ${data.phone}`);
 lines.push(`${fr?'Description':'Description'}: ${data.description}`);
 if(data.additionalInfo) lines.push(`${fr?'Précisions':'Additional information'}: ${data.additionalInfo}`);
 for(const question of questions) {
  const value=data.answers[question.key];if(!value)continue;
  const option=question.options.find(item=>item.value===value);
  lines.push(`${question[data.language]} ${option?option[data.language]:value}`);
 }
 const text=lines.join('\n');
 const escaped=text.replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
 return {email:{from,to:TEST_RECIPIENT,replyTo:data.email,subject:`${batch}-${data.service.toUpperCase()}-${data.language.toUpperCase()} | ${service}`,text,html:`<div style="white-space:pre-wrap">${escaped}</div>`},idempotencyKey:`${batch}/${data.service}/${data.language}`};
}
function createHandler({env,verify,deliver,now=()=>Date.now()}) {
 return async request=>{
  const respond=(status,body)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
  if(!testConfiguration(env,now()).enabled)return respond(503,{success:false,code:'PREVIEW_DISABLED'});
  const url=new URL(request.url);
  if(url.hostname!==TEST_HOST || request.headers.get('origin')!==`https://${TEST_HOST}`)return respond(403,{success:false,code:'TEST_SCOPE_REQUIRED'});
  if(!request.headers.get('content-type')?.startsWith('application/json'))return respond(415,{success:false});
  if(Number(request.headers.get('content-length'))>24000)return respond(413,{success:false});
  let body;
  try {const text=await request.text();if(Buffer.byteLength(text)>24000)return respond(413,{success:false});body=JSON.parse(text);}catch{return respond(400,{success:false});}
  if(!body || typeof body!=='object' || body.website || !['fr','en'].includes(body.language))return respond(403,{success:false});
  const result=validateEnquiry(body);
  if(!result.ok)return respond(422,{success:false,errors:result.errors});
  const {data}=result;
  if(!data.fullName.startsWith('AUDIT ') || data.email!==`audit+${data.service}-${data.language}@example.com` || !data.description.startsWith('AUDIT '))return respond(403,{success:false,code:'FICTITIOUS_TEST_DATA_REQUIRED'});
  if(typeof body.recaptchaToken!=='string' || !body.recaptchaToken || body.recaptchaToken.length>5000)return respond(403,{success:false,code:'ANTISPAM_REQUIRED'});
  try {
   const valid=await verify(body.recaptchaToken,TEST_HOST);
   if(!valid)return respond(403,{success:false,code:'ANTISPAM_REJECTED'});
   const payload=notification(data,env.PREVIEW_ENQUIRY_TEST_BATCH,env.RESEND_FROM_EMAIL);
   const sent=await deliver(payload.email,{idempotencyKey:payload.idempotencyKey});
   if(sent.error || !sent.data?.id)return respond(502,{success:false,code:'DELIVERY_FAILED'});
   return respond(200,{success:true,reference:payload.idempotencyKey});
  }catch{return respond(502,{success:false,code:'DELIVERY_FAILED'});}
 };
}
module.exports={testConfiguration,notification,createHandler,TEST_HOST};
