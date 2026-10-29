import Image from 'next/image';
import EditorialSteps from '@/components/EditorialSteps';
import Link from '@/components/LocalizedLink';
import fr from '@/content/editorial.fr.json';
import en from '@/content/editorial.en.json';
import { getRequestLanguage } from '@/i18n/server';

const contactRoutes = {
  home: '/contact', about: '/contact', corporate: '/contact?service=corporate',
  formation: '/contact/business', property: '/contact/real-estate', immigration: '/contact/installation',
};
const pictures = {
  home: '/photo_2024-12-13_11-33-38.jpg', about: '/photo_2024-12-13_11-33-38.jpg',
  formation: '/krakenimages-376KN_ISplE-unsplash.jpg', corporate: '/optiBusinImg.jpg',
  property: '/core-architects_portuguese-architecture99-1160x613.jpg', immigration: '/passportPP.jpeg',
};

function Inline({ text }) {
  return text.split(/(\*\*[\s\S]+?\*\*)/g).map((part, index) => {
    if (part.startsWith('**')) return <strong key={index}><Inline text={part.slice(2, -2)} /></strong>;
    return part.split(/(\*[^*]+\*)/g).map((piece, i) => piece.startsWith('*') ? <em key={index+'-'+i}>{piece.slice(1, -1)}</em> : piece);
  });
}

function ctaTarget(text, subject) {
  if (!/^\*\*[^*]+\*\*$/.test(text)) return null;
  const label = text.slice(2, -2);
  if (/^(Explore Corporate|Découvrir l'accompagnement juridique des sociétés|Découvrez mon accompagnement juridique des sociétés)/i.test(label)) return '/corporate-legal-services-portugal';
  if (/^(Explore Real Estate|Découvrir l'accompagnement immobilier|Découvrez mon accompagnement immobilier)/i.test(label)) return '/real-estate';
  if (/^(Explore Immigration|Découvrir l'accompagnement en immigration)/i.test(label)) return '/settling-in-portugal';
  if (/^(Learn More About Me|En savoir plus sur mon parcours)/i.test(label)) return '/about';
  if (/^(Read Legal Insights|Consulter les articles juridiques)/i.test(label)) return '/blogs';
  if (/^Explore My Legal Services/i.test(label)) return '/#services';
  if (/^(Get in Touch|Prendre contact|Discutons de votre projet|Let's discuss|Discuss Your|Let's Discuss Your|Contact Me to Discuss)/i.test(label)) return contactRoutes[subject];
  return null;
}

function DirectoryItem({ text }) {
  const directory = /annuaire|official .* directory/i.test(text);
  if (!directory) return <Inline text={text} />;
  const href = /Paris/i.test(text)
    ? 'https://www.avocatparis.org/annuaire/avocat?cnbf=CEC346A8rTbjqcZT5F/0ow=='
    : 'https://portal.oa.pt/advogados/pesquisa-de-advogados/';
  return <a href={href} className="text-primary-dark underline underline-offset-4"><Inline text={text} /></a>;
}

function Blocks({ blocks, subject }) {
  return blocks.map((block, index) => {
    if (block.type === 'heading') return <h3 key={index} className="text-xl sm:text-2xl font-semibold text-gray-900 pt-5"><Inline text={block.text} /></h3>;
    if (block.type === 'list') return <ul key={index} className="list-disc pl-6 space-y-3">{block.items.map((item, i) => <li key={i}><DirectoryItem text={item} /></li>)}</ul>;
    const target = ctaTarget(block.text, subject);
    if (target) return <p key={index} className="pt-3"><Link href={target} className="inline-flex rounded-lg bg-primary-dark px-5 py-3 text-white font-semibold hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"><Inline text={block.text} /></Link></p>;
    return <p key={index}><Inline text={block.text} /></p>;
  });
}

function SectionBlocks({ section, subject }) {
  const isStep = block => (block.type === 'heading' && /^\d+\. /.test(block.text)) || (block.type === 'paragraph' && /^\*\*\d+\. .+\*\*$/.test(block.text));
  const numbered = section.blocks.filter(isStep);
  if (numbered.length < 2) return <Blocks blocks={section.blocks} subject={subject} />;
  const first = section.blocks.findIndex(isStep);
  const steps = [];
  for (const block of section.blocks.slice(first)) {
    if (isStep(block)) steps.push({title: block.text.replace(/\*/g, ''), blocks: []});
    else steps[steps.length - 1].blocks.push(block);
  }
  return <>
    <Blocks blocks={section.blocks.slice(0, first)} subject={subject} />
    <EditorialSteps steps={steps.map(step => ({ title: step.title, content: <Blocks blocks={step.blocks} subject={subject} /> }))} />
  </>;
}

function Questions({ blocks, subject }) {
  const questions = [];
  for (const block of blocks) {
    if (block.type === 'heading') questions.push({ title: block.text, blocks: [] });
    else if (questions.length) questions[questions.length - 1].blocks.push(block);
  }
  return <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white px-5 sm:px-8">{questions.map((question, index) => <details key={index} className="group py-5">
    <summary className="cursor-pointer text-lg font-semibold text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"><h3 className="inline"><Inline text={question.title} /></h3></summary>
    <div className="mt-4 space-y-4 leading-relaxed text-gray-700"><Blocks blocks={question.blocks} subject={subject} /></div>
  </details>)}</div>;
}

export default async function EditorialPage({ subject, children }) {
  const language = await getRequestLanguage();
  const page = (language === 'fr' ? fr : en)[subject];
  const home = subject === 'home';
  return <>
    <header className="relative bg-gradient-to-br from-gray-50 to-gray-100 pt-28 pb-14 sm:pt-36 sm:pb-20">
      {home && <Image src="/portugal-4828134_1280.jpg" alt="" fill className="object-cover opacity-10" priority />}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
        <div className="space-y-5 text-gray-700 leading-relaxed">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{page.title}</h1>
          <h2 className="text-xl sm:text-2xl font-medium text-primary-dark">{page.intro.title}</h2>
          <Blocks blocks={page.intro.blocks} subject={subject} />
          {home && <p><a className="underline underline-offset-4 text-primary-dark" href="https://calendly.com/mouniamikou/discovery-call">{language === 'fr' ? 'Prendre rendez-vous' : 'Book a meeting'}</a></p>}
        </div>
        <Image src={pictures[subject]} alt={subject === 'home' || subject === 'about' ? 'Mounia Mikou' : ''} width={900} height={900} className="rounded-2xl shadow-xl w-full max-w-lg mx-auto max-h-[560px] object-cover" priority />
      </div>
    </header>
    {page.sections.map((section, index) => <section key={index} id={home && index === 0 ? 'services' : undefined} className={index % 2 ? 'py-12 sm:py-16 bg-gray-50' : 'py-12 sm:py-16 bg-white'}>
      <div className="max-w-5xl mx-auto px-5 sm:px-8 space-y-6 text-gray-700 leading-relaxed">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{section.title}</h2>
        {/^(Questions fréquentes|Frequently Asked Questions)$/i.test(section.title)
          ? <Questions blocks={section.blocks} subject={subject} />
          : <SectionBlocks section={section} subject={subject} />}
      </div>
    </section>)}
    {children}
  </>;
}
