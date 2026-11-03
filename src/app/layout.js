
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
      name: "Mounia Mikou",
      url: "https://mouniamikou.com",
      description: language === "fr"
        ? "Mounia Mikou. Avocate inscrite au Barreau de Paris et enregistrée au Barreau de Lisbonne. Elle accompagne les particuliers et les entrepreneurs au Portugal en français et en anglais."
        : "Mounia Mikou. Lawyer admitted to the Paris Bar and registered with the Lisbon Bar. She advises individuals and entrepreneurs in Portugal in English and French.",
      areaServed: "Portugal",
      inLanguage: ["en", "fr"],
    },
    {
      "@type": "Person",
      "@id": "https://mouniamikou.com/#person",
      name: "Mounia Mikou",
      jobTitle: language === "fr" ? "Avocate" : "Lawyer",
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
