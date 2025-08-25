import React from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/app/lib/LanguageContext";

const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="bg-cover bg-center bg-no-repeat text-white py-35 relative"
      style={{
        backgroundImage: "url('/inter2.webp')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-700/30 dark:from-blue-800/30 dark:to-purple-900/30" />
      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 text-center bg-[rgba(0,0,0,0.5)] rounded-lg shadow-lg py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {t("hero.title")}
        </h1>
        <p className="text-lg md:text-xl opacity-90 leading-relaxed mb-6">
          {t("hero.description")}
        </p>

        <a
          href="#services"
          className="inline-flex items-center px-6 py-3 text-base font-medium bg-white text-blue-700 rounded-lg shadow hover:bg-gray-100 transition"
        >
          {t("hero.button")} <ArrowRight className="ml-2 w-4 h-4" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
