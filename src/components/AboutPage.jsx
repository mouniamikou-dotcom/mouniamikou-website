"use client"
import { motion } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import Image from 'next/image';
import { Scale, GraduationCap, ArrowUpRight } from 'lucide-react';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4 grid lg:grid-cols-2 gap-8">
        <section aria-labelledby="professional-registration" className="bg-gray-50 p-6 sm:p-8 rounded-xl">
          <Scale aria-hidden="true" className="w-10 h-10 text-primary mb-5" />
          <h2 id="professional-registration" className="text-2xl sm:text-3xl font-bold text-primary mb-8 scroll-mt-24">
            {french ? 'Inscriptions professionnelles' : 'Professional registrations'}
          </h2>
          <ul className="space-y-7 text-gray-600 leading-relaxed">
            <li>
              <p className="text-xl font-semibold text-gray-900 mb-2">{french ? 'Barreau de Paris' : 'Paris Bar'}</p>
              <p>{french ? 'Prestation de serment le 19 janvier 2018. Exercice principal à l’étranger, à Lisbonne.' : 'Sworn in on 19 January 2018. Principal practice abroad, in Lisbon.'}</p>
              <a className="inline-flex items-center gap-2 mt-4 text-primary-dark font-medium underline underline-offset-4 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" href="https://www.avocatparis.org/annuaire/avocat?cnbf=CEC346A8rTbjqcZT5F/0ow==">
                {french ? 'Annuaire du barreau de Paris' : 'Paris Bar directory'}
                <ArrowUpRight aria-hidden="true" className="w-4 h-4 shrink-0" />
              </a>
            </li>
            <li>
              <p className="text-xl font-semibold text-gray-900 mb-2">Ordem dos Advogados, Lisboa</p>
              <p>{french ? 'Cédula 90149L · Inscription le 9 novembre 2023.' : 'Registration no. 90149L · Registered on 9 November 2023.'}</p>
              <a className="inline-flex items-center gap-2 mt-4 text-primary-dark font-medium underline underline-offset-4 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" href="https://portal.oa.pt/advogados/pesquisa-de-advogados/">
                {french ? 'Annuaire de l’Ordem dos Advogados' : 'Ordem dos Advogados directory'}
                <ArrowUpRight aria-hidden="true" className="w-4 h-4 shrink-0" />
              </a>
            </li>
          </ul>
        </section>
        <section aria-labelledby="professional-education" className="bg-gray-50 p-6 sm:p-8 rounded-xl">
          <GraduationCap aria-hidden="true" className="w-10 h-10 text-primary mb-5" />
          <h2 id="professional-education" className="text-2xl sm:text-3xl font-bold text-primary mb-8 scroll-mt-24">
            {french ? 'Formation' : 'Education'}
          </h2>
          <ul className="space-y-6">
            {[
              { title: 'CAPA', school: 'EFB', date: '2016-2018' },
              { title: 'Master of Laws (LLM)', school: 'The University of Queensland', date: '2017' },
              { title: 'Master 2 Droit Bancaire et Financier', school: 'Université Panthéon-Assas', date: '2014-2015' },
              { title: 'Master 2 Droit des affaires et fiscalité', school: 'Université Paris II Panthéon-Assas', date: '2013-2014' },
              { title: french ? 'Formation en droit bancaire' : 'Banking law studies', school: 'Universidade de Lisboa', date: '2022-2023' },
            ].map(({ title, school, date }) => (
              <li key={title} className="border-l-2 border-primary-light pl-4">
                <p className="text-sm font-medium text-primary-dark mb-1">{date}</p>
                <h3 className="font-semibold text-gray-900 leading-snug">{title}</h3>
                <p className="text-gray-600 mt-1">{school}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
