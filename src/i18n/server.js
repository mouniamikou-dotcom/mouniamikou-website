import { headers } from 'next/headers';
import { englishPath, localizedPath, pageAlternates, SITE_URL } from './routes';

export async function getRequestLanguage() {
  return (await headers()).get('x-site-language') === 'fr' ? 'fr' : 'en';
}

const pages = {
  '/': {
    en: ['French-Speaking Lawyer in Lisbon, Portugal | Mounia Mikou', 'French-speaking lawyer in Lisbon. Legal support for relocation, real estate investment and business creation in Portugal. Book a discovery call.'],
    fr: ['Avocate francophone à Lisbonne, Portugal | Mounia Mikou', 'Mounia Mikou, avocate francophone à Lisbonne, vous accompagne pour votre installation, votre achat immobilier et votre création d’entreprise au Portugal.'],
  },
  '/about': {
    en: ['Meet Mounia Mikou | French-Speaking Lawyer in Portugal', 'Discover Mounia Mikou, her international legal experience and her support for individuals and entrepreneurs in Portugal.'],
    fr: ['Mounia Mikou | Avocate francophone au Portugal', 'Découvrez le parcours international de Mounia Mikou et son accompagnement juridique des particuliers et entrepreneurs au Portugal.'],
  },
  '/settling-in-portugal': {
    en: ['Settling in Portugal | Relocation Lawyer | Mounia Mikou', 'Legal support for moving to Portugal: visas, residence, NIF and administrative procedures. Discuss your project with Mounia Mikou.'],
    fr: ['S’installer au Portugal | Avocate francophone | Mounia Mikou', 'Visas, résidence, NIF et démarches administratives : Mounia Mikou vous accompagne dans votre installation au Portugal. Échangeons sur votre projet.'],
  },
  '/real-estate': {
    en: ['Property Lawyer in Portugal | Mounia Mikou', 'Secure your purchase or sale in Portugal with legal due diligence, contract review and representation through to completion.'],
    fr: ['Avocate en immobilier au Portugal | Mounia Mikou', 'Sécurisez votre achat ou votre vente au Portugal : vérifications juridiques, contrat de vente et représentation jusqu’à la signature.'],
  },
  '/business-creation-portugal': {
    en: ['Starting a Business in Portugal | Lawyer | Mounia Mikou', 'Legal guidance for choosing your structure, setting up your company and developing your business in Portugal.'],
    fr: ['Créer une entreprise au Portugal | Avocate | Mounia Mikou', 'Choix de la structure juridique, constitution de société et suivi : un accompagnement pour créer et développer votre entreprise au Portugal.'],
  },
  '/blogs': {
    en: ['Legal Guides for Portugal | Mounia Mikou', 'Practical legal guides on property, visas, business creation and tax in Portugal, by French-speaking lawyer Mounia Mikou.'],
    fr: ['Guides juridiques sur le Portugal | Mounia Mikou', 'Immobilier, visas, création d’entreprise et fiscalité : les guides pratiques de Mounia Mikou, avocate francophone au Portugal.'],
  },
  '/contact': {
    en: ['Contact Mounia Mikou | Lawyer in Lisbon', 'Discuss your relocation, property or business project in Portugal with Mounia Mikou.'],
    fr: ['Contacter Mounia Mikou | Avocate à Lisbonne', 'Présentez votre projet d’installation, d’achat immobilier ou de création d’entreprise au Portugal à Mounia Mikou.'],
  },
  '/terms': { en: ['Terms of Service | Mounia Mikou', 'Professional status, terms of service and legal information for the Mounia Mikou website.'] },
  '/privacy': { en: ['Privacy Policy | Mounia Mikou', 'Information about personal data processing and your rights.'] },
  '/cookies': { en: ['Cookie Policy | Mounia Mikou', 'Information about cookies and privacy preferences on the Mounia Mikou website.'] },
};

export async function requestMetadata() {
  const requestHeaders = await headers();
  const language = await getRequestLanguage();
  const path = englishPath(requestHeaders.get('x-site-path') || '/');
  const contact = path.startsWith('/contact/') ? pages['/contact'] : null;
  const copy = (pages[path] || contact || pages['/'])[language] || pages['/'].en;
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
