"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import Link from "@/components/LocalizedLink";
import { Home, Building, Briefcase, FileText } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/translations";

function ContactPage() {
  const { language } = useLanguage();
  const t = translations[language]?.mainForm || translations.en.mainForm;

  return (
    <>
      <Navbar />
      <div
        className="mb-4 bg-gray-50 py-24 px-4 sm:px-4 lg:px-8"
        style={{
          backgroundImage: "url('/blob-scene-haikei (2).svg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#039B9B] mb-6">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {t.subtitle}
            </p>
          </div>

          {/* Service Type Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                value: "installation",
                label: t.services.installation.title,
                icon: <Home size={20} />,
                href: "/contact/installation",
              },
              {
                value: "real-estate",
                label: t.services.realEstate.title,
                icon: <Building size={20} />,
                href: "/contact/real-estate",
              },
              {
                value: "business",
                label: t.services.business.title,
                icon: <Briefcase size={20} />,
                href: "/contact/business",
              },
              {
                value: "other",
                label: t.services.other.title,
                icon: <FileText size={20} />,
                href: "/contact/other",
              },
            ].map((service) => (
              <Link href={service.href} key={service.value}>
                <div className="p-6 bg-white rounded-xl shadow-lg cursor-pointer transform transition-all duration-200 hover:scale-105 border border-gray-200">
                  <div className="text-4xl text-primary mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {service.label}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {
                      t.services[
                        service.value === "real-estate"
                          ? "realEstate"
                          : service.value
                      ].description
                    }
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactPage;
