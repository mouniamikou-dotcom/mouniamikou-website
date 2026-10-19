import About from '@/components/AboutPage'
import ContactCTA from '@/components/AboutToContact'
import Footer from '@/components/Footer'

import Navbar from '@/components/Navbar'
import Values from '@/components/Value'
import React from 'react'


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