import editorialFr from '@/content/editorial.fr.json';
import editorialEn from '@/content/editorial.en.json';
import { headers } from 'next/headers';
import { englishPath, localizedPath, pageAlternates, SITE_URL } from './routes';

export async function getRequestLanguage() {
  return (await headers()).get('x-site-language') === 'fr' ? 'fr' : 'en';
}

const pages = {
  '/': {
    en: ['Mounia Mikou | Lawyer in Lisbon, legal advice in English', 'Lawyer admitted to the Paris and Lisbon Bars. Legal guidance in English and French for relocation, property purchases and business formation in Portugal.'],
    fr: ['Mounia Mikou | Avocate à Lisbonne, accompagnement en français', 'Avocate inscrite aux barreaux de Paris et de Lisbonne. Accompagnement en français et en anglais pour s’installer, acheter un bien ou entreprendre au Portugal.'],
  },
  '/about': {
    en: ['Meet Mounia Mikou | Lawyer admitted to the Paris and Lisbon Bars', 'Meet Mounia Mikou, a lawyer admitted to the Paris and Lisbon Bars, advising individuals and entrepreneurs in Portugal in English and French.'],
    fr: ['Mounia Mikou | Avocate aux barreaux de Paris et de Lisbonne', 'Découvrez le parcours de Mounia Mikou, avocate aux barreaux de Paris et de Lisbonne, et son accompagnement au Portugal en français et en anglais.'],
  },
  '/settling-in-portugal': {
    en: ['Settling in Portugal | Relocation Lawyer | Mounia Mikou', 'Legal support in English for moving to Portugal: visas, residence, NIF and administrative procedures. Discuss your project with Mounia Mikou.'],
    fr: ['S’installer au Portugal | Accompagnement en français | Mounia Mikou', 'Visas, résidence, NIF et démarches administratives : Mounia Mikou vous accompagne en français dans votre installation au Portugal.'],
  },
  '/real-estate': {
    en: ['Property Lawyer in Portugal | Mounia Mikou', 'Secure your purchase or sale in Portugal with legal due diligence, contract review and representation through to completion.'],
    fr: ['Avocate en immobilier au Portugal | Mounia Mikou', 'Sécurisez votre achat ou votre vente au Portugal : vérifications juridiques, contrat de vente et représentation jusqu’à la signature.'],
  },
  '/business-creation-portugal': {
    en: ['Starting a Business in Portugal | Lawyer | Mounia Mikou', 'Legal guidance for choosing your structure, setting up your company and developing your business in Portugal.'],
    fr: ['Créer une entreprise au Portugal | Avocate | Mounia Mikou', 'Choix de la structure juridique, constitution de société et suivi : un accompagnement pour créer et développer votre entreprise au Portugal.'],
  },
  '/corporate-legal-services-portugal': {
    fr: ['Accompagnement juridique des sociétés au Portugal | Mounia Mikou', 'Gouvernance, contrats, financement et formalités : Mounia Mikou accompagne la vie et le développement de votre société au Portugal.'],
    en: ['Corporate Legal Support in Portugal | Mounia Mikou', 'Legal support for your company in Portugal: shareholders, governance, commercial contracts, financing and corporate filings with Mounia Mikou.'],
  },
  '/blogs': {
    en: ['Legal Guides for Portugal | Mounia Mikou', 'Practical guides on property, visas, business and tax in Portugal by Mounia Mikou, a lawyer providing legal advice in English and French.'],
    fr: ['Guides juridiques sur le Portugal | Mounia Mikou', 'Immobilier, visas, entreprise et fiscalité au Portugal : les guides de Mounia Mikou, avocate proposant un accompagnement en français et en anglais.'],
  },
  '/contact': {
    en: ['Contact Mounia Mikou | Lawyer in Lisbon', 'Discuss your relocation, property or business project in Portugal with Mounia Mikou.'],
    fr: ['Contacter Mounia Mikou | Avocate à Lisbonne', 'Présentez votre projet d’installation, d’achat immobilier ou de création d’entreprise au Portugal à Mounia Mikou.'],
  },
  '/terms': { en: ['Terms of Service | Mounia Mikou', 'Professional status, terms of service and legal information for the Mounia Mikou website.'] },
  '/privacy': { en: ['Privacy Policy | Mounia Mikou', 'Information about personal data processing and your rights.'] },
  '/cookies': { en: ['Cookie Policy | Mounia Mikou', 'Information about cookies and privacy preferences on the Mounia Mikou website.'] },
};

const editorialSubjects = {
  '/': 'home', '/about': 'about', '/business-creation-portugal': 'formation',
  '/corporate-legal-services-portugal': 'corporate', '/real-estate': 'property', '/settling-in-portugal': 'immigration',
};

export async function requestMetadata() {
  const requestHeaders = await headers();
  const language = await getRequestLanguage();
  const path = englishPath(requestHeaders.get('x-site-path') || '/');
  const contact = path.startsWith('/contact/') ? pages['/contact'] : null;
  let copy = (pages[path] || contact || pages['/'])[language] || pages['/'].en;
  const subject = editorialSubjects[path];
  if (subject) {
    const page = (language === 'fr' ? editorialFr : editorialEn)[subject];
    copy = [page.title + ' | Mounia Mikou', pages[path][language][1]];
  }
  const url = SITE_URL + localizedPath(path, language);
  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: copy[0] },
    description: copy[1],
    alternates: pageAlternates(path, language),
    openGraph: { type: 'website', title: copy[0], description: copy[1], url, locale: language === 'fr' ? 'fr_FR' : 'en_US', siteName: 'Mounia Mikou' },
    twitter: { card: 'summary_large_image', title: copy[0], description: copy[1] },
    robots: { index: true, follow: true },
  };
}
