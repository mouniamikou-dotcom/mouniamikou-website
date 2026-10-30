import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from '@/components/LocalizedLink';
import {getRequestLanguage} from '@/i18n/server';
import legal from '@/content/legal.fr-en.json';

function Paragraph({text}) {
  return text.split(/(mm@mouniamikou\.com|https:\/\/www\.cnpd\.pt)/g).map((part,index)=> {
    const href=part==='mm@mouniamikou.com'?'mailto:'+part:part==='https://www.cnpd.pt'?part:null;
    return href?<a key={index} href={href} className="underline underline-offset-4 text-primary-dark break-words">{part}</a>:part;
  });
}
export default async function LegalPage({kind}) {
  const language=await getRequestLanguage();
  const page=legal[kind][language];
  return <><Navbar /><main className="bg-gray-50 text-gray-900 pt-28 pb-16 px-5 sm:pt-36 sm:px-8">
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{page.title}</h1>
      {page.sections.map((section,index)=><section key={section.title} className="rounded-xl border border-gray-200 bg-white p-5 sm:p-8 space-y-4 leading-relaxed">
        <h2 className="text-xl sm:text-2xl font-semibold text-primary-dark">{section.title}</h2>
        {section.paragraphs.map((paragraph,i)=><p key={i} className="break-words"><Paragraph text={paragraph}/></p>)}
      </section>)}
      <nav aria-label={language==='fr'?'Informations légales':'Legal information'} className="flex flex-wrap gap-x-6 gap-y-3 text-primary-dark underline underline-offset-4">
        <Link href="/privacy">{legal.privacy[language].title}</Link>
        <Link href="/cookies">{legal.cookies[language].title}</Link>
        <Link href="/terms">{legal.terms[language].title}</Link>
      </nav>
    </div>
  </main><Footer /></>;
}
