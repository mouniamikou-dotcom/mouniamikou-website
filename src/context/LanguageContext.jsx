"use client";
import { createContext, useContext } from 'react';

const LanguageContext = createContext({ language: 'en' });

export function LanguageProvider({ children, language = 'en' }) {
  return <LanguageContext.Provider value={{ language }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
