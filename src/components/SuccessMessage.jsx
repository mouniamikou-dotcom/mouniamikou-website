"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/translations";
import Link from "next/link";
const SuccessMessage = () => {
  const { language } = useLanguage();
  const t = translations[language]?.contact || translations.en.contact;

  return (
    <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-2xl mx-auto mb-8">
      <div className="mb-6">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {t.success.title}
      </h2>
      <p className="text-gray-600 mb-8">{t.success.message}</p>
      <Link href="https://calendly.com/mouniamikou/meeting">
        <button className="mt-4 bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition">
          🗓 {t.success.cta}
        </button>
      </Link>
    </div>
  );
};

export default SuccessMessage;
