// Historical forms have been replaced by the validated /api/enquiry circuit.
export async function POST() {
  return Response.json({success:false,code:'FORM_REPLACED'}, {status:process.env.VERCEL_ENV === 'production' ? 410 : 503,headers:{'Cache-Control':'no-store'}});
}
