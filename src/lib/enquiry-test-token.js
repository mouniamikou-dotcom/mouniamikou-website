// Loaded only after submission in an explicitly enabled preview test window.
let loading;
export async function enquiryTestToken() {
 const key=process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
 if(!key)throw Error('Anti-spam unavailable');
 if(!window.grecaptcha) {
  if(!loading)loading=new Promise((resolve,reject)=>{
   const script=document.createElement('script');
   const fail=()=>{clearTimeout(timeout);script.remove();loading=undefined;reject(Error('Anti-spam unavailable'));};
   const timeout=setTimeout(fail,10000);
   script.src=`https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(key)}`;
   script.async=true;
   script.onload=()=>{clearTimeout(timeout);if(window.grecaptcha)resolve();else fail();};
   script.onerror=fail;
   document.head.appendChild(script);
  });
  await loading;
 }
 return new Promise((resolve,reject)=>{
  const timeout=setTimeout(()=>reject(Error('Anti-spam timeout')),10000);
  window.grecaptcha.ready(()=>window.grecaptcha.execute(key,{action:'enquiry_test'}).then(token=>{clearTimeout(timeout);resolve(token);},error=>{clearTimeout(timeout);reject(error);}));
 });
}
