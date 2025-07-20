import React from "react";
import { useLanguage } from "../../lib/LanguageContext";

const WhyChooseUsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
              {t("WhyChooseUs")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              We combine years of experience with cutting-edge technology to
              deliver exceptional results for our clients.
            </p>
            <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              {t("getStarted")}
            </button>
          </div>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400 text-lg">
              Feature Image
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
