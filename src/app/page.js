import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"

import Services from "@/components/Service"

import Footer from "@/components/Footer"
import BlogList from "./blogs/page"

// import BookingButton from "@/components/Bookingbutton"

export const metadata = {
  title: "French Lawyer Portugal | Relocation, Real Estate & Business | Mounia Mikou",
  description: "French-speaking lawyer based in Lisbon. Mounia Mikou guides you through settling in Portugal, real estate investment, and business creation. Book a free discovery call.",
  alternates: { canonical: "https://mouniamikou.com" },
  openGraph: {
    title: "French Lawyer Portugal | Relocation, Real Estate & Business | Mounia Mikou",
    description: "French-speaking lawyer based in Lisbon. Expert legal support for settling in Portugal, real estate investment, and business creation.",
    url: "https://mouniamikou.com",
  },
};

export default function Home() {
  return (
 
    <main>
      <Navbar />
      <Hero />
      <Services />
      <BlogList/>
      <Footer />
      
    </main>
 
  )
}
