import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EditorialPage from '@/components/EditorialPage';
import BlogList from '@/components/BlogList';
import { getBlogPosts } from '@/sanity/lib/blogPost';

export default async function Home() {
  return <><Navbar /><main><EditorialPage subject="home" />
    <section className="py-10 max-w-7xl mx-auto px-5"><BlogList initialPosts={await getBlogPosts()} /></section>
  </main><Footer /></>;
}
