
import "./globals.css";

import { LanguageProvider } from "@/context/LanguageContext";

export const metadata = {
  metadataBase: new URL('https://mouniamikou.com'),
  title: {
    default: "French Lawyer Portugal | Relocation, Real Estate & Business | Mounia Mikou",
    template: "%s | Mounia Mikou",
  },
  description: "French-speaking lawyer based in Lisbon. Mounia Mikou guides you through settling in Portugal, real estate investment, and business creation. Book a free discovery call.",
  keywords: [
    "French lawyer Portugal",
    "avocat Portugal",
    "relocation Portugal",
    "real estate Portugal",
    "business creation Portugal",
    "D7 visa Portugal",
    "francophone lawyer Lisbon",
    "expatriation Portugal",
    "Mounia Mikou",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "fr_FR",
    url: "https://mouniamikou.com",
    siteName: "Mounia Mikou - French Lawyer in Portugal",
    title: "French Lawyer Portugal | Relocation, Real Estate & Business | Mounia Mikou",
    description: "French-speaking lawyer based in Lisbon. Expert legal support for settling in Portugal, real estate investment, and business creation.",
  },
  twitter: {
    card: "summary_large_image",
    title: "French Lawyer Portugal | Mounia Mikou",
    description: "French-speaking lawyer based in Lisbon. Expert legal support for settling in Portugal, real estate investment, and business creation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      "@id": "https://mouniamikou.com/#legalservice",
      name: "Mounia Mikou – French Lawyer in Portugal",
      url: "https://mouniamikou.com",
      description: "French-speaking lawyer based in Lisbon specialising in relocation, real estate, and business creation in Portugal.",
      areaServed: "Portugal",
      inLanguage: ["en", "fr", "pt", "ar"],
      priceRange: "$$",
    },
    {
      "@type": "Person",
      "@id": "https://mouniamikou.com/#person",
      name: "Mounia Mikou",
      jobTitle: "Lawyer",
      url: "https://mouniamikou.com",
      worksFor: { "@id": "https://mouniamikou.com/#legalservice" },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <LanguageProvider>
        <body>{children}</body>
      </LanguageProvider>
    </html>
  );
}
