
import "./globals.css";

import { getRequestLanguage } from "@/i18n/server";
import { LanguageProvider } from "@/context/LanguageContext";

export { requestMetadata as generateMetadata } from "@/i18n/server";

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

export default async function RootLayout({ children }) {
  const language = await getRequestLanguage();
  return (
    <html lang={language}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body>
        <LanguageProvider language={language}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
