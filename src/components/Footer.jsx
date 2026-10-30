"use client";
import { navigationLabels } from '@/i18n/navigation';
import { MapPin, Mail, Linkedin, Instagram } from "lucide-react";
import Link from "@/components/LocalizedLink";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/index";
import LanguageSelector from "./LanguageSelector";

export default function Footer() {
  const { language } = useLanguage();
  const t = { ...translations[language], nav: { ...translations[language].nav, ...navigationLabels[language] } };

  const navItems = [
    { label: t.nav.about, href: "/about" },
    { label: t.nav.installP, href: "/settling-in-portugal" },
    { label: t.nav.realestate, href: "/real-estate" },
    { label: t.nav.business, href: "/business-creation-portugal" },
    { label: t.nav.corporate, href: "/corporate-legal-services-portugal" },
    { label: t.nav.blogs, href: "/blogs" },
  ];
  return (
    <footer className="bg-gray-900  text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left Section - Address & Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t.footer.contact}</h3>
            <p className="flex items-center space-x-2">
              <MapPin size={20} />
              <span>Travessa Cova da Moura 2, R/C dir. 1350-118 Lisboa</span>
            </p>
            <p className="flex items-center space-x-2 mt-2">
              <Mail size={20} />
              <a
                href="mailto:mm@mouniamikou.com"
                className="hover:text-primary transition-colors"
              >
                mm@mouniamikou.com
              </a>
            </p>
            <div className="flex space-x-6 mt-4">
              <Link
                href="https://www.linkedin.com/in/mounia-mikou/"
                aria-label="LinkedIn"
                className="hover:text-primary transition-colors"
              >
                <Linkedin size={28} />
              </Link>
              <Link
                href="https://www.instagram.com/mounmk/"
                aria-label="Instagram"
                className="hover:text-primary transition-colors"
              >
                <Instagram size={28} />
              </Link>
            </div>
          </div>

          {/* Center Section - Navigation */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {t.footer.navigation}
            </h3>
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section - Legal Consultation Box */}
          <div className=" p-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-4">
              {t.footer.needLegalAdvice}
            </h3>
            <p className="text-sm text-gray-300 mt-2 mb-2">
              {t.footer.legalGuidance}
            </p>
            <Link href="https://calendly.com/mouniamikou/meeting">
              <button className="mt-4 bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition">
                {language === 'fr' ? 'Réserver une consultation juridique payante' : 'Book a paid legal consultation'}
              </button>
            </Link>
          </div>
        </div>

        <div className="flex space-x-2 w-full ">
          <Link href="/terms" className="hover:text-primary transition-colors">
            {t.footer.legalLinks.terms}
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            href="/privacy"
            className="hover:text-primary transition-colors"
          >
            {t.footer.legalLinks.privacy}
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            href="/cookies"
            className="hover:text-primary transition-colors"
          >
            {t.footer.legalLinks.cookies}
          </Link>
        </div>
      </div>

      {/* Legal Links */}
      <div className="text-center pb-6 text-sm text-gray-400 border-t border-gray-800 pt-6">
        <p className="mt-2">
          © {new Date().getFullYear()} {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
