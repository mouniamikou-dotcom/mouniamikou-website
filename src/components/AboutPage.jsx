"use client"
import { motion } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import Image from 'next/image';

export default function About() {
  const { language } = useLanguage();
  const t = translations[language];

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
              alt="Profile"
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
              <h3 className="text-xl font-semibold text-white mb-4">
                {t.about.languages}
              </h3>
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
    </section>
  );
}