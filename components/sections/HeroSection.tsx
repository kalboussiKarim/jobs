import React from "react";
import { useLanguage } from "../../lib/LanguageContext";
import { ArrowRight } from "lucide-react";

const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-800 dark:to-purple-900 text-white py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {t("heroTitle")}
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          {t("heroSubtitle")}
        </p>
        <p className="text-lg mb-10 max-w-3xl mx-auto opacity-80">
          {t("heroDescription")}
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2">
          <span>{t("learnMore")}</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
