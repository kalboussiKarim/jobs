"use client";

import React, { useState } from "react";
import { useLanguage } from "../lib/LanguageContext";
import {
  ArrowRight,
  Star,
  Users,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import ContactModal from "./ContactModal";

const MainContent: React.FC = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <main className="min-h-screen transition-colors duration-300">
      {/* Section 1: Hero Section */}
      <section
        id="home"
        className="bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-800 dark:to-purple-900 text-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
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
        </div>
      </section>

      {/* Section 2: Cards Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Star className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                {t("cardTitle1")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("cardDesc1")}
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="bg-green-100 dark:bg-green-900 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                {t("cardTitle2")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("cardDesc2")}
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                {t("cardTitle3")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("cardDesc3")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Services Section */}
      <section
        id="services"
        className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
                {t("ourServices")}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                {t("servicesDescription")}
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                {t("getStarted")}
              </button>
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 text-lg">
                Services Image
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: About Section */}
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

      {/* Section 5: Another Content Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
                Why Choose Us?
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

      {/* Section 6: Contact Section with Modal */}
      <section
        id="contact"
        className="py-20 bg-gray-900 dark:bg-gray-950 text-white transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("contactUs")}
            </h2>
            <p className="text-lg mb-10 max-w-3xl mx-auto opacity-80">
              {t("contactDescription")}
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
            >
              <Mail className="h-5 w-5" />
              <span>{t("openForm")}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
};

export default MainContent;
