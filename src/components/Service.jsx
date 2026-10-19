// Services.js
"use client";
import { motion } from "framer-motion";
import { Home, Building, Briefcase, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

export default function Services() {
  const { language } = useLanguage();
  const t = translations[language];

  const services = [
    {
      icon: Home,
      title: t.services.installation.title,
      description: t.services.installation.description,
      items: t.services.installation.items,
      image: "/passportPP.jpeg",
      buttonText: t.services.installation.cta,
      link: "/settling-in-portugal",
    },
    {
      icon: Building,
      title: t.services.realEstate.title,
      description: t.services.realEstate.description,
      items: t.services.realEstate.items,
      image: "/core-architects_portuguese-architecture99-1160x613.jpg",
      buttonText: t.services.realEstate.cta,
      link: "/real-estate",
    },
    {
      icon: Briefcase,
      title: t.services.business.title,
      description: t.services.business.description,
      items: t.services.business.items,
      image: "/krakenimages-376KN_ISplE-unsplash.jpg",
      buttonText: t.services.business.cta,
      link: "/business-creation-portugal",
    },
  ];

  return (
    <section id="services" className="py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white">{t.services.title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group flex flex-col h-full"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  fill
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 object-cover transition-transform duration-300 group-hover:scale-110"
                  quality={90}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.items.map((item) => (
                    <li key={item} className="text-gray-600 flex items-center">
                      <span className="text-primary mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <button className="w-full bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
                    <Link href={service.link}>{service.buttonText}</Link>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
