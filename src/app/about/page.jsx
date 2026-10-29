import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EditorialPage from '@/components/EditorialPage';

export default function Page() {
  return <><Navbar /><main><EditorialPage subject='about' /></main><Footer /></>;
}
