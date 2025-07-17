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
    <div className="transition-colors duration-300">
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

      {/* Section 6: Contact Section with Modal */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-all duration-300 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-300 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-300 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-3/4 left-3/4 w-24 h-24 bg-pink-300 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
              Join Our Team!
            </h2>
            <p className="text-xl md:text-2xl mb-4 text-gray-700 dark:text-gray-300 font-medium">
              Ready to take your career to the next level?
            </p>
            <p className="text-lg mb-12 max-w-3xl mx-auto text-gray-600 dark:text-gray-400 leading-relaxed">
              We're looking for passionate individuals who want to make a
              difference. Join our dynamic team and be part of something
              extraordinary.
            </p>

            {/* Fancy Apply Now Button */}
            <div className="relative inline-block">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-12 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 animate-bounce hover:animate-none"
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Moving shine effect */}
                <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                {/* Button content */}
                <div className="relative flex items-center space-x-3">
                  <Mail className="h-6 w-6 transform group-hover:rotate-12 transition-transform duration-300" />
                  <span className="font-bold tracking-wide">Apply Now!</span>
                  <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 animate-pulse"></div>
              </button>

              {/* Floating particles around button */}
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-100"></div>
              <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-300"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default MainContent;
