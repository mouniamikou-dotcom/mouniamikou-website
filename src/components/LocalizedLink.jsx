'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { localizedPath } from '@/i18n/routes';

export default function LocalizedLink({ href, ...props }) {
  const { language } = useLanguage();
  return <Link href={localizedPath(href, language)} {...props} />;
}
