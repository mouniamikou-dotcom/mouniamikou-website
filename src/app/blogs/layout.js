import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"


export default function BlogsLayout({ children }) {
    return (
      <>
        <Navbar/>
        {children}
        <Footer/>
      </>
    )
  }