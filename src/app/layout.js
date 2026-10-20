
import "./globals.css";

import { getRequestLanguage } from "@/i18n/server";
import { localizedPath, SITE_URL } from "@/i18n/routes";
import { LanguageProvider } from "@/context/LanguageContext";

export { requestMetadata as generateMetadata } from "@/i18n/server";

const schemaOrg = (language) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      "@id": "https://mouniamikou.com/#legalservice",
      name: "Mounia Mikou - French Lawyer in Portugal",
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
      url: SITE_URL + localizedPath("/about", language),
      sameAs: [
        "https://www.avocatparis.org/annuaire/avocat?cnbf=CEC346A8rTbjqcZT5F/0ow==",
        "https://www.linkedin.com/in/mounia-mikou/",
      ],
      worksFor: { "@id": "https://mouniamikou.com/#legalservice" },
    },
  ],
});

export default async function RootLayout({ children }) {
  const language = await getRequestLanguage();
  return (
    <html lang={language}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg(language)) }}
        />
      </head>
      <body>
        <LanguageProvider language={language}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
