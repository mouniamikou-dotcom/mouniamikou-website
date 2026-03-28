import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

export const metadata = {
  title: "Blog | Legal Guides for Portugal Expats",
  description: "Expert legal articles on settling in Portugal, real estate investment, D7 visa, and business creation. Written by French lawyer Mounia Mikou.",
  alternates: {
    canonical: "https://mouniamikou.com/blogs",
    languages: {
      'en': 'https://mouniamikou.com/blogs',
      'fr': 'https://mouniamikou.com/blogs',
      'x-default': 'https://mouniamikou.com/blogs',
    },
  },
  openGraph: {
    title: "Blog | Legal Guides for Portugal Expats | Mounia Mikou",
    description: "Expert legal articles on settling in Portugal, real estate investment, D7 visa, and business creation.",
    url: "https://mouniamikou.com/blogs",
  },
};

export default function BlogsLayout({ children }) {
    return (
      <>
        <Navbar/>
        {children}
        <Footer/>
      </>
    )
  }