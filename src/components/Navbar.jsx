"use client"
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import LanguageSelector from './LanguageSelector';
import Image from 'next/image';
import Link from "@/components/LocalizedLink";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false); // State for services dropdown
  const { language } = useLanguage();
  const t = translations[language];

  const navItems = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.about, href: '/about' },
    { 
      label: t.nav.services, 
      href: '/',
      submenu: [
        { label: t.nav.installP, href: '/settling-in-portugal' },
        { label: t.nav.realestate, href: '/real-estate' },
        { label: t.nav.business, href: '/business-creation-portugal' },
      ]
    },
    { label: t.nav.blogs, href: '/blogs' },
  ];

  return (
    <div className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">   
          <Link href="/" className="text-xl font-bold w-16 h-16">         
            <Image src="/Logo blanc_page-0001.jpg" alt="logo lawyer" width={100} height={20}/>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-20">
            {navItems.map((item) => (
              item.submenu ? (
                <div key={item.label} className="relative group">
                  <button 
                    className="flex items-center text-gray-600 hover:text-primary transition-colors"
                    onClick={() => setServicesOpen(!servicesOpen)}
                  >
                    {item.label} <ChevronDown className="ml-1 w-4 h-4" />
                  </button>
                  {servicesOpen && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 mt-3 bg-white shadow-lg rounded-lg w-56 py-3">
                      {item.submenu.map((subItem) => (
                        <Link 
                          key={subItem.label} 
                          href={subItem.href} 
                          className="block px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
                          onClick={() => setServicesOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  key={item.label} 
                  href={item.href} 
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>

          {/* Language and Contact Button */}
          <div className="hidden md:flex items-center space-x-6">
            <LanguageSelector />
            <Link
              href="/contact"
              className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              {t.nav.contact}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                item.submenu ? (
                  <div key={item.label}>
                    <button 
                      className="w-full text-left px-3 py-2 flex justify-between text-gray-600 hover:text-primary transition-colors"
                      onClick={() => setServicesOpen(!servicesOpen)}
                    >
                      {item.label} <ChevronDown className="w-4 h-4" />
                    </button>
                    {servicesOpen && (
                      <div className="ml-4 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link 
                            key={subItem.label} 
                            href={subItem.href} 
                            className="block px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
                            onClick={() => {
                              setIsOpen(false);
                              setServicesOpen(false);
                            }}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link 
                    key={item.label} 
                    href={item.href} 
                    className="block px-3 py-2 text-gray-600 hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}
              <div className="px-2 py-2">
                <Link
                  href="/contact"
                  className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  {t.nav.contact}
                </Link>
              </div>
              <div className="px-3 py-2">
                <LanguageSelector />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
