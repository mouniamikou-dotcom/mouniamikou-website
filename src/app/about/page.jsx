import About from '@/components/AboutPage'
import ContactCTA from '@/components/AboutToContact'
import Footer from '@/components/Footer'

import Navbar from '@/components/Navbar'
import Values from '@/components/Value'
import React from 'react'

export const metadata = {
  title: "Meet Mounia Mikou – Your French-Speaking Lawyer in Portugal",
  description: "Discover Mounia Mikou, a French-speaking lawyer in Lisbon helping expats with relocation, real estate, and business creation in Portugal.",
  alternates: {
    canonical: "https://mouniamikou.com/about",
    languages: {
      'en': 'https://mouniamikou.com/about',
      'fr': 'https://mouniamikou.com/about',
      'x-default': 'https://mouniamikou.com/about',
    },
  },
  openGraph: {
    title: "Meet Mounia Mikou – Your French-Speaking Lawyer in Portugal",
    description: "Discover Mounia Mikou, a French-speaking lawyer in Lisbon helping expats with relocation, real estate, and business creation in Portugal.",
    url: "https://mouniamikou.com/about",
  },
};

function page() {
  return (
    <>
    <Navbar/>
    <About/>
    <Values/>
    <ContactCTA></ContactCTA>
<Footer></Footer>
    </>
  )
}

export default page