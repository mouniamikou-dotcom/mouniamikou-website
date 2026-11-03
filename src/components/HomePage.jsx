import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import HomeNavigation from '@/components/HomeNavigation';
import copy from '@/content/homepage.fr-en.json';
import { articleCategoryLabel } from '@/i18n/article-categories';
import './HomePage.css';

const Paragraphs = ({items}) => items.map(text => <p key={text}>{text}</p>);
const PageLink = ({children, href, className = 'textlink'}) => <Link className={className} href={href}>{children}<span aria-hidden="true"> ↗</span></Link>;

export default function HomePage({language, posts}) {
  const c = copy[language];
  // Curated existing articles only. Unpublished or missing translations are not invented.
  const articles = copy.articleSlugs.map(slug => posts.find(post => post.slug?.current === slug))
    .filter(post => post?.title?.[language] && (language !== 'fr' || post.hasFrench));
  return <div className="home-redesign">
    <a className="skip" href="#main">{language === 'fr' ? 'Aller au contenu' : 'Skip to content'}</a>
    <HomeNavigation language={language} labels={c.nav} />
    <main id="main">
      <section className="hero"><div className="shell hero-grid">
        <div className="hero-copy"><p className="eyebrow">{c.location}</p><h1>{c.hero}</h1><Paragraphs items={c.intro} />
          <div className="hero-actions"><PageLink href="/contact" className="button primary">{c.cta}</PageLink><PageLink href="#domaines" className="textlink secondary">{c.secondary}</PageLink></div>
        </div>
        <figure className="portrait"><Image src="/photo_2024-12-13_11-33-38.jpg" alt="Mounia Mikou" width={900} height={1280} sizes="(max-width: 640px) 160px, (max-width: 900px) 40vw, 340px" priority /></figure>
      </div></section>
      <section id="domaines" className="section"><div className="shell">
        <div className="section-heading"><span className="eyebrow">01 · {language === 'fr' ? 'EXPERTISES' : 'AREAS OF PRACTICE'}</span><h2>{c.services}</h2></div>
        <div className="corporate-panel"><div className="corporate-copy"><h3>{c.corporate}</h3><Paragraphs items={c.corptext} /></div>
          <div className="corporate-links"><PageLink href="/business-creation-portugal" className="path-link">{c.corplinks[0]}</PageLink><PageLink href="/corporate-legal-services-portugal" className="path-link">{c.corplinks[1]}</PageLink></div>
        </div>
        <div className="other-services"><article><h3>{c.property}</h3><Paragraphs items={c.propertytext} /><PageLink href="/real-estate">{c.propertylink}</PageLink></article>
          <article><h3>{c.immigration}</h3><Paragraphs items={c.immigrationtext} /><PageLink href="/settling-in-portugal">{c.immigrationlink}</PageLink></article></div>
      </div></section>
      <section className="section biography"><div className="shell biography-grid"><div><span className="eyebrow">02 · {language === 'fr' ? 'PARCOURS' : 'BACKGROUND'}</span><h2>{c.bio}</h2><Paragraphs items={c.biotext} /><PageLink href="/about">{c.biolink}</PageLink></div>
        <ul className="markers">{c.markers.map(text => <li key={text}>{text}</li>)}</ul>
      </div></section>
      <section className="section"><div className="shell"><div className="section-heading"><span className="eyebrow">03 · {language === 'fr' ? 'PREMIER CONTACT' : 'FIRST CONTACT'}</span><h2>{c.start}</h2></div>
        <ol className="steps">{c.steps.map(([title,text],i) => <li key={title}><span className="step-number">0{i+1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
        <PageLink href="/contact" className="button primary">{c.request}</PageLink>
        <div className="booking"><h3>{c.booking}</h3><div className="booking-grid"><div><h4>{c.free}</h4><p>{c.freetext}</p><PageLink href="https://calendly.com/mouniamikou/discovery-call">{c.freelink}</PageLink></div><div><h4>{c.paid}</h4><p>{c.paidtext}</p><PageLink href="https://calendly.com/mouniamikou/meeting">{c.paidlink}</PageLink></div></div></div>
      </div></section>
      <section className="section insights"><div className="shell"><div className="section-heading"><span className="eyebrow">04 · {language === 'fr' ? 'ARTICLES' : 'INSIGHTS'}</span><h2>{c.articles}</h2><p>{c.articleintro}</p></div>
        <div className="article-grid">{articles.map(post => {
          const excerpt = post.excerpt?.[language] || '';
          const shortExcerpt = post.slug.current === copy.articleSlugs[0] && excerpt.includes('?') ? excerpt.slice(excerpt.indexOf('?')+1).trim() : excerpt;
          return <article className="article" key={post._id}><div className="article-meta"><span>{articleCategoryLabel(post.category,language)}</span><time dateTime={post.publishedAt.slice(0,10)}>{new Date(post.publishedAt).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'})}</time></div><h3>{post.title[language]}</h3><p>{shortExcerpt}</p><PageLink href={'/blogs/'+post.slug.current}>{c.read}</PageLink></article>;
        })}</div><div className="all-articles"><PageLink href="/blogs">{c.all}</PageLink></div>
      </div></section>
      <section className="section final-contact"><div className="shell final-inner"><h2>{c.final}</h2><Paragraphs items={c.finaltext} /><PageLink href="/contact" className="button light">{c.request}</PageLink></div></section>
    </main>
    <footer><div className="shell footer-inner"><div><strong>Mounia Mikou</strong><p>Travessa Cova da Moura 2, R/C dir.<br />1350-118 Lisboa</p><a href="mailto:mm@mouniamikou.com">mm@mouniamikou.com</a></div><div className="footer-right"><p>{c.legal.map((label,i) => <span key={label}>{i>0 && ' · '}<PageLink href={['/terms','/privacy','/cookies'][i]} className="footerlink">{label}</PageLink></span>)}</p><p>© {new Date().getFullYear()} Mounia Mikou</p></div></div></footer>
  </div>;
}
