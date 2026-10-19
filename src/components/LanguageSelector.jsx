"use client"
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { localizedPath } from '@/i18n/routes';
import Fra from "../../public/france.png"
import Eng from "../../public/us_uk_flag_pre.jpg"
import { useLanguage } from '../context/LanguageContext';

const languages = {
  en: { flag: Fra, alt: 'Passer en français', code: 'fr' },
  fr: { flag: Eng, alt: 'Switch to English', code: 'en' }
};

export default function LanguageSelector() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const currentOption = languages[language];

  return (
    <a
      href={localizedPath(pathname, currentOption.code)}
      hrefLang={currentOption.code}
      aria-label={currentOption.alt}
      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
      title={currentOption.alt}
    >
      <div className="w-6 h-4 relative">
        <Image
          src={currentOption.flag}
          alt={currentOption.alt}
          fill
          className="object-cover rounded-sm hover:opacity-80 transition-opacity"
          priority
        />
      </div>
    </a>
  );
}