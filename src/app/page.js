import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"

import Services from "@/components/Service"

import Footer from "@/components/Footer"
import BlogList from "@/components/BlogList"
import { getBlogPosts } from "@/sanity/lib/blogPost"

// import BookingButton from "@/components/Bookingbutton"


export default async function Home() {
  return (
 
    <main>
      <Navbar />
      <Hero />
      <Services />
      <BlogList initialPosts={await getBlogPosts()} />
      <Footer />
      
    </main>
 
  )
}
