"use client";

import React from "react";
import { useLanguage } from "../../lib/LanguageContext";
import { motion } from "framer-motion";

const services = [
  {
    icon: "🎯",
    title: "Conseil en Externalisation",
    description:
      "Optimisation de vos processus business et stratégies d'externalisation pour améliorer votre compétitivité sur les marchés européens.",
    subServices: [
      {
        icon: "📈",
        title: "Développement Commercial",
        description:
          "Expansion commerciale en Europe avec des stratégies personnalisées et un réseau de partenaires qualifiés.",
      },
      {
        icon: "🚀",
        title: "Placement Professionnel",
        description:
          "Mise en relation des diplômés et jeunes professionnels du Maghreb avec des postes en tension dans l'UE.",
      },
    ],
  },
  {
    icon: "📋",
    title: "Accompagnement Carte Bleue EU",
    description:
      "Assistance complète pour l'obtention de la Carte Bleue Européenne : constitution du dossier, suivi administratif, conseils juridiques.",
    subServices: [
      {
        icon: "🎓",
        title: "Formation & Coaching",
        description:
          "Préparation aux entretiens, adaptation culturelle, formation aux standards européens.",
      },
      {
        icon: "🤝",
        title: "Suivi Post-Placement",
        description:
          "Accompagnement continu après votre arrivée : intégration, évolution, renouvellement des permis.",
      },
    ],
  },
];

const ServicesSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="services"
      className="py-20 bg-gray-100 dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-400 dark:text-white mb-4">
          {t("services.title")}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {t("services.description")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-200 dark:bg-gray-700 p-6 rounded-xl shadow-md relative"
          >
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">{service.icon}</span>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                {service.title}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {service.description}
            </p>
            {service.subServices.map((sub, subIndex) => (
              <div
                key={subIndex}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-4 mb-4"
              >
                <div className="flex items-center mb-1">
                  <span className="text-xl mr-2">{sub.icon}</span>
                  <h4 className="text-lg font-medium text-gray-800 dark:text-white">
                    {sub.title}
                  </h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {sub.description}
                </p>
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
