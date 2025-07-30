"use client";

import React, { use } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/lib/LanguageContext";

const processSteps = [
  {
    title: "card1.title",
    description: "card1.description",
  },
  {
    title: "card2.title",
    description: "card2.description",
  },
  {
    title: "card3.title",
    description: "card3.description",
  },
  {
    title: "card4.title",
    description: "card4.description",
  },
  {
    title: "card5.title",
    description: "card5.description",
  },
  {
    title: "card6.title",
    description: "card6.description",
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
  const { t } = useLanguage();
  return (
    <section
      id="services"
      className="pb-10 pt-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-400 dark:text-white mb-15">
          {t("process.title")}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {t("process.description")}
        </p>
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
            className="relative bg-blue-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md p-6 text-center transform hover:scale-105 transition-transform duration-700 mb-4"
          >
            {/* Number Circle */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shadow-md">
                {index + 1}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-8 mb-3">
              {t("process." + step.title)}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t("process." + step.description)}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProcessSection;
