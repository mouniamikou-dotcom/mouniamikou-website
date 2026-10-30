'use client';

import { Menu, X, ChevronDown } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { englishPath } from '@/i18n/routes';
import { navigationLabels } from '@/i18n/navigation';
import LanguageSelector from './LanguageSelector';
import Image from 'next/image';
import Link from '@/components/LocalizedLink';

export default function Navbar() {
  const { language } = useLanguage();
  const labels = navigationLabels[language];
  const pathname = englishPath(usePathname());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [corporateOpen, setCorporateOpen] = useState(false);
  const nav = useRef(null);
  const trigger = useRef(null);
  const firstLink = useRef(null);
  const id = useId();
  const corporateActive = ['/business-creation-portugal', '/corporate-legal-services-portugal'].includes(pathname);
  const companyPages = [{ label: labels.business, href: '/business-creation-portugal' }, { label: labels.corporate, href: '/corporate-legal-services-portugal' }];
  const before = [{ label: labels.home, href: '/' }, { label: labels.about, href: '/about' }];
  const after = [{ label: labels.realestate, href: '/real-estate' }, { label: labels.installP, href: '/settling-in-portugal' }, { label: labels.blogs, href: '/blogs' }, { label: labels.contact, href: '/contact' }];
  const close = () => { setMobileOpen(false); setCorporateOpen(false); };

  useEffect(() => { setMobileOpen(false); setCorporateOpen(false); }, [pathname]);
  useEffect(() => {
    const outside = event => { if (!nav.current?.contains(event.target)) setCorporateOpen(false); };
    const escape = event => { if (event.key === 'Escape') {setCorporateOpen(false); trigger.current?.focus();} };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape);};
  }, []);

  const style = (href, extra = '') => 'rounded-md px-2 py-2 text-sm font-medium transition-colors hover:text-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary '+(pathname === href ? 'text-primary-dark underline underline-offset-8 ' : 'text-gray-700 ')+extra;
  const navLink = (item, mobile = false) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined} onClick={close} className={style(item.href, mobile ? 'block px-3 py-3' : '')}>{item.label}</Link>;

  return <nav ref={nav} aria-label={language === 'fr' ? 'Navigation principale' : 'Main navigation'} className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16 gap-4">
        <Link href="/" aria-label={language === 'fr' ? 'Mounia Mikou, accueil' : 'Mounia Mikou, home'} className="w-16 h-16 shrink-0" onClick={close}><Image src="/Logo blanc_page-0001.jpg" alt="Mounia Mikou" width={64} height={64} /></Link>
        <div className="hidden xl:flex items-center justify-end gap-2 flex-1">
          {before.map(item => navLink(item))}
          <div className="relative">
            <button ref={trigger} type="button" aria-expanded={corporateOpen} aria-controls={id+'-desktop-company'} className={style(corporateActive ? pathname : '', 'flex items-center gap-1')} onClick={() => setCorporateOpen(open => !open)} onKeyDown={event => {if (event.key === 'ArrowDown') {event.preventDefault(); setCorporateOpen(true); requestAnimationFrame(() => firstLink.current?.focus());}}}>
              {labels.corporateGroup}<ChevronDown aria-hidden="true" size={16} className={corporateOpen ? 'rotate-180' : ''} />
            </button>
            {corporateOpen && <div id={id+'-desktop-company'} className="absolute left-0 mt-2 rounded-lg border border-gray-200 bg-white shadow-lg w-80 p-2">
              {companyPages.map((item, index) => <Link key={item.href} ref={index === 0 ? firstLink : undefined} href={item.href} aria-current={pathname === item.href ? 'page' : undefined} onClick={close} className={style(item.href, 'block px-4 py-3')}>{item.label}</Link>)}
            </div>}
          </div>
          {after.map(item => navLink(item))}
          <LanguageSelector />
        </div>
        <div className="flex xl:hidden items-center gap-3"><LanguageSelector /><button type="button" aria-label={language === 'fr' ? 'Menu de navigation' : 'Navigation menu'} aria-expanded={mobileOpen} aria-controls={id+'-mobile'} onClick={() => {setMobileOpen(open => !open); setCorporateOpen(false);}} className="p-2 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">{mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button></div>
      </div>
      {mobileOpen && <div id={id+'-mobile'} className="xl:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto py-3">
        {before.map(item => navLink(item, true))}
        <button type="button" aria-expanded={corporateOpen} aria-controls={id+'-mobile-company'} onClick={() => setCorporateOpen(open => !open)} className={style(corporateActive ? pathname : '', 'w-full flex justify-between items-center px-3 py-3 text-left')}>{labels.corporateGroup}<ChevronDown aria-hidden="true" size={18} className={corporateOpen ? 'rotate-180' : ''} /></button>
        {corporateOpen && <div id={id+'-mobile-company'} className="ml-5 border-l border-gray-200 pl-3">{companyPages.map(item => navLink(item, true))}</div>}
        {after.map(item => navLink(item, true))}
      </div>}
    </div>
  </nav>;
}
