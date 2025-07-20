"use client";

import React from "react";
import { motion } from "framer-motion";

const processSteps = [
  {
    title: "Évaluation de Profil",
    description:
      "Analyse complète de votre profil, compétences et objectifs professionnels pour identifier les meilleures opportunités.",
  },
  {
    title: "Recherche d'Opportunités",
    description:
      "Identification des postes en tension correspondant à votre profil dans notre réseau d'entreprises partenaires.",
  },
  {
    title: "Préparation & Candidature",
    description:
      "Optimisation de votre CV, préparation aux entretiens et soumission de candidatures ciblées.",
  },
  {
    title: "Négociation & Contrat",
    description:
      "Accompagnement dans les négociations salariales et validation du contrat de travail conforme aux exigences EU.",
  },
  {
    title: "Démarches Carte Bleue",
    description:
      "Constitution et suivi complet du dossier de demande de Carte Bleue Européenne avec nos experts juridiques.",
  },
  {
    title: "Installation & Suivi",
    description:
      "Accompagnement pour votre installation en Europe et suivi de votre intégration professionnelle et personnelle.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const ProcessSection: React.FC = () => {
  return (
    <section
      id="process"
      className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
          Notre Processus
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {processSteps.map((step, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            // @ts-ignore
            variants={cardVariants}
            className="relative bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md p-6 text-center transform transition-transform duration-2000 hover:scale-105"
          >
            {/* Number Circle */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-md">
                {index + 1}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-8 mb-3">
              {step.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProcessSection;
