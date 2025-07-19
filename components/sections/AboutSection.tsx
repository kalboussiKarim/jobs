import React from "react";
import { useLanguage } from "../../lib/LanguageContext";

const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400 text-lg">
              About Image
            </span>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
              {t("aboutUs")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              {t("aboutDescription")}
            </p>
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              {t("learnMore")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
