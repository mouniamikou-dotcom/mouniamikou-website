import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EnquiryForm from '@/components/form/EnquiryForm';

export default function ContactPage({ initialService = '' }) {
  return <><Navbar /><main><EnquiryForm initialService={initialService} /></main><Footer /></>;
}
