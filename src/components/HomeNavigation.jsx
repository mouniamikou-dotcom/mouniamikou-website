'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import LanguageSelector from '@/components/LanguageSelector';

export default function HomeNavigation({ language, labels }) {
  const mobileMenu = useRef(null);
  const items = labels.map((label, index) => ({label, href: ['#domaines', '/about', '/blogs', '/contact'][index]}));
  const links = () => items.map(item => <Link key={item.href} className="navlink" href={item.href} onClick={() => {if (mobileMenu.current) mobileMenu.current.open = false;}}>{item.label}</Link>);
  return <header className="site-header"><div className="shell navigation">
    <Link href="/" aria-label={language === 'fr' ? 'Mounia Mikou, accueil' : 'Mounia Mikou, home'}><Image src="/Logo blanc_page-0001.jpg" alt="Mounia Mikou" width={58} height={58} /></Link>
    <nav className="desktop-nav" aria-label={language === 'fr' ? 'Navigation principale' : 'Main navigation'}>{links()}<LanguageSelector /></nav>
    <div className="mobile-controls"><LanguageSelector /><details ref={mobileMenu} className="mobile-nav" onKeyDown={event => {
      if (event.key === 'Escape' && mobileMenu.current?.open) {
        event.preventDefault();
        mobileMenu.current.open = false;
        mobileMenu.current.querySelector('summary')?.focus();
      }
    }}>
      <summary aria-label={language === 'fr' ? 'Menu de navigation' : 'Navigation menu'}>☰</summary>
      <nav aria-label={language === 'fr' ? 'Navigation mobile' : 'Mobile navigation'}>{links()}</nav>
    </details></div>
  </div></header>;
}
