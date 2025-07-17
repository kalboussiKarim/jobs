"use client";

import React from "react";
import { useLanguage } from "../lib/LanguageContext";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  ArrowUp,
} from "lucide-react";

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { key: "home", href: "#home" },
    { key: "about", href: "#about" },
    { key: "services", href: "#services" },
    { key: "contact", href: "#contact" },
  ];

  const serviceLinks = [
    { key: "webDevelopment", href: "#" },
    { key: "mobileApps", href: "#" },
    { key: "consulting", href: "#" },
    { key: "support", href: "#" },
  ];

  const companyLinks = [
    { key: "about", href: "#about" },
    { key: "careers", href: "#" },
    { key: "blog", href: "#" },
    { key: "news", href: "#" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white relative transition-colors duration-300">
      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 right-8 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white p-3 rounded-full shadow-lg transition-colors"
        aria-label="Back to top"
      >
        <ArrowUp className="h-6 w-6" />
      </button>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                Horizon Talents
              </h2>
              <p className="text-gray-300 dark:text-gray-400 text-sm leading-relaxed">
                {t("footerDescription")}
              </p>
            </div>

            {/* Social Media Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {t("followUs")}
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors text-sm"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              {t("services")}
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service.key}>
                  <a
                    href={service.href}
                    className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors text-sm"
                  >
                    {t(service.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              {t("contactInfo")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 dark:text-gray-400 text-sm">
                  {t("address")}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                <a
                  href={`tel:${t("phone")}`}
                  className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors text-sm"
                >
                  {t("phone")}
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                <a
                  href={`mailto:${t("email")}`}
                  className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors text-sm"
                >
                  {t("email")}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-800 dark:border-gray-700">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Subscribe to our Newsletter
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 dark:bg-gray-900 border border-gray-700 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
              />
              <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-6 py-2 rounded-md font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 dark:text-gray-500 text-sm">
              © {currentYear} Horizon Talents. {t("allRightsReserved")}
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              <a
                href="#"
                className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 transition-colors text-sm"
              >
                {t("privacyPolicy")}
              </a>
              <a
                href="#"
                className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 transition-colors text-sm"
              >
                {t("termsOfService")}
              </a>
              <a
                href="#"
                className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 transition-colors text-sm"
              >
                {t("cookiePolicy")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
