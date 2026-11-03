import {Resend} from 'resend';
import {createHandler,testConfiguration} from '@/lib/preview-enquiry.cjs';
import {createPublicHandler,publicConfiguration,createBurstLimiter} from '@/lib/public-enquiry.cjs';
const allow=createBurstLimiter();
export const dynamic='force-dynamic';
export async function GET() {
 return Response.json(process.env.VERCEL_ENV === 'production' ? publicConfiguration(process.env) : testConfiguration(process.env),{headers:{'Cache-Control':'no-store'}});
}
export async function POST(request) {
 const factory=process.env.VERCEL_ENV === 'production' ? createPublicHandler : createHandler;
 return factory({env:process.env,allow,
  verify:async(token,hostname,action='enquiry_test')=>{
   const response=await fetch('https://www.google.com/recaptcha/api/siteverify',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({secret:process.env.RECAPTCHA_SECRET_KEY,response:token}),signal:AbortSignal.timeout(10000),cache:'no-store'});
   if(!response.ok)return false;
   const result=await response.json();
   return result.success===true && result.score>=0.5 && result.action===action && result.hostname===hostname;
  },
  deliver:async(payload,options)=>new Resend(process.env.RESEND_API_KEY).emails.send(payload,options),
 })(request);
}
