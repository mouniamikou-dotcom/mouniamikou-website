"use client";
import React from "react";
import Link from "@/components/LocalizedLink";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

const ContactCTA = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="py-16 bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          {t.contactCTA.title}
        </h2>
        {/* <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          {t.contactCTA.description}
        </p> */}
        <Link
          href="/contact"
          className="inline-block bg-white text-primary px-8 py-3 rounded-full font-semibold 
                   transition-transform hover:scale-105 hover:shadow-lg"
        >
          {t.contactCTA.cta}
        </Link>
      </div>
    </section>
  );
};

export default ContactCTA;
