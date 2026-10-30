'use client';

import Link from 'next/link';
import { forwardRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { localizedPath } from '@/i18n/routes';

export default forwardRef(function LocalizedLink({ href, ...props }, ref) {
  const { language } = useLanguage();
  return <Link ref={ref} href={localizedPath(href, language)} {...props} />;
});
