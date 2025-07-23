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
        {/* Title centered at top */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-400 dark:text-white">
            {t("AboutSection.title")}
          </h2>
        </div>

        {/* Horizontal layout: image left, text right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Placeholder */}
          <div className=" rounded-lg h-64 flex items-center justify-center">
            <img src={"./about3.png"} />
          </div>

          {/* Text content */}
          <div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {t("AboutSection.description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
