"use client"
import { motion } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import Image from 'next/image';

export default function About() {
  const { language } = useLanguage();
  const t = translations[language];
  const french = language === 'fr';

  return (
    <section id="about" className="pt-24 pb-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 rounded-lg lg:px-8 bg-primary">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
              <Image
              width={900}
              height={100}
              src="/photo_2024-12-13_11-33-38.jpg"
              alt="Mounia Mikou"
              className="rounded-2xl mb-4 shadow-xl w-full max-w-md mx-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="prose prose-lg max-w-none"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-12">{t.about.title}</h1>
            {t.about.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-white mb-4">
                {paragraph}
              </p>
            ))}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-white mb-4">
                {t.about.languages}
              </h2>
              <div className="flex flex-wrap gap-3">
                {['Français', 'English', 'Português', 'العربية'].map((lang) => (
                  <span
                    key={lang}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 grid md:grid-cols-2 gap-10 text-gray-800">
        <section aria-labelledby="professional-registration">
          <h2 id="professional-registration" className="text-2xl font-semibold mb-4">
            {french ? 'Inscriptions professionnelles' : 'Professional registrations'}
          </h2>
          <ul className="space-y-5">
            <li>
              <p className="font-semibold">{french ? 'Barreau de Paris' : 'Paris Bar'}</p>
              <p>{french ? 'Prestation de serment le 19 janvier 2018. Exercice principal à l’étranger, à Lisbonne.' : 'Sworn in on 19 January 2018. Principal practice abroad, in Lisbon.'}</p>
              <a className="text-blue-700 underline underline-offset-4" href="https://www.avocatparis.org/annuaire/avocat?cnbf=CEC346A8rTbjqcZT5F/0ow==">
                {french ? 'Consulter la fiche au barreau de Paris' : 'View the Paris Bar directory entry'}
              </a>
            </li>
            <li>
              <p className="font-semibold">Ordem dos Advogados — Lisboa</p>
              <p>{french ? 'Cédula 90149L · Inscription le 9 novembre 2023.' : 'Registration no. 90149L · Registered on 9 November 2023.'}</p>
              <a className="text-blue-700 underline underline-offset-4" href="https://portal.oa.pt/advogados/pesquisa-de-advogados/">
                {french ? 'Vérifier dans l’annuaire portugais : rechercher « Mounia Mikou » ou « 90149L »' : 'Check the Portuguese directory: search for “Mounia Mikou” or “90149L”'}
              </a>
            </li>
          </ul>
        </section>
        <section aria-labelledby="professional-education">
          <h2 id="professional-education" className="text-2xl font-semibold mb-4">
            {french ? 'Formation' : 'Education'}
          </h2>
          <ul className="list-disc pl-5 space-y-3">
            <li>CAPA — EFB (2016–2017)</li>
            <li>Master of Laws (LLM) — The University of Queensland (2016–2017)</li>
            <li>Master 2 Droit Bancaire et Financier — Université Panthéon-Assas (2014–2015)</li>
            <li>Master 2 Droit des affaires et fiscalité — Université Paris II Panthéon-Assas (2013–2014)</li>
            <li>{french ? 'Formation en droit bancaire' : 'Banking law studies'} — Universidade de Lisboa (2022–2023)</li>
          </ul>
          <p className="mt-5">
            <a className="text-blue-700 underline underline-offset-4" href="https://www.linkedin.com/in/mounia-mikou/">
              {french ? 'Consulter mon parcours complet sur LinkedIn' : 'View my full background on LinkedIn'}
            </a>
          </p>
        </section>
      </div>
    </section>
  );
}
