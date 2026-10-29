import ContactPage from '@/components/ContactPage';
import { enquiryServices } from '@/content/enquiry';

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const initialService = enquiryServices.includes(params.service) ? params.service : '';
  return <ContactPage initialService={initialService} />;
}
