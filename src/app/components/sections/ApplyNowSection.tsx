import React from "react";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/lib/LanguageContext";

const ApplyNowSection: React.FC = () => {
  const router = useRouter();
  const { t } = useLanguage();
  return (
    <section
      id="apply"
      className="pt-10 pb-15 bg-gray-100 dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-400 dark:text-white mb-6">
            {t("ApplySection.title")}
          </h2>
          <p className="text-xl md:text-2xl mb-4 text-gray-700 dark:text-gray-300 font-medium">
            {t("ApplySection.subtitle")}
          </p>
          <p className="text-lg mb-12 max-w-3xl mx-auto text-gray-600 dark:text-gray-400 leading-relaxed">
            {t("ApplySection.description")}
          </p>

          {/* Apply Now Button */}
          <div className="relative inline-block">
            <button
              onClick={() => router.push("/apply")}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white px-12 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-1000"
            >
              {/* Hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              {/* Button content */}
              <div className="relative flex items-center space-x-10">
                <span className="font-bold tracking-wide">
                  {t("ApplySection.button")}
                </span>
              </div>

              {/* Soft glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 animate-pulse"></div>
            </button>

            {/* Floating particles */}
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-100"></div>
            <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-300"></div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-800 rounded-full animate-bounce delay-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplyNowSection;
