"use client";

import React from "react";
import { useLanguage } from "../../lib/LanguageContext";
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
import { usePathname } from "next/navigation";

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

  const pathname = usePathname();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white relative transition-colors duration-300">
      {/* Back to top button */}
      {pathname != "/apply" && (
        <button
          onClick={scrollToTop}
          className="absolute -top-6 right-8 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white p-3 rounded-full shadow-lg transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}

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
                {t("common.footer.footerDescription")}
              </p>
            </div>

            {/* Social Media Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {t("common.footer.followUs")}
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
              {t("common.footer.quickLinks")}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors text-sm"
                  >
                    {t("common.footer" + link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              {t("common.footer.services")}
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service.key}>
                  <a
                    href={service.href}
                    className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors text-sm"
                  >
                    {t("common.footer" + service.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              {t("common.footer.contactInfo")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 dark:text-gray-400 text-sm">
                  {t("common.footer.address")}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                <a
                  href={`tel:${+351912909896}`}
                  className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors text-sm"
                >
                  +351 912 909 896
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                <a
                  href={`mailto:${t("footer.email")}`}
                  className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors text-sm"
                >
                  {t("common.footer.email")}
                </a>
              </div>
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
              © {currentYear} Horizon Talents.{" "}
              {t("common.footer.allRightsReserved")}
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              <a
                href="#"
                className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 transition-colors text-sm"
              >
                {t("common.footer.privacyPolicy")}
              </a>
              <a
                href="#"
                className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 transition-colors text-sm"
              >
                {t("common.footer.termsOfService")}
              </a>
              <a
                href="#"
                className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 transition-colors text-sm"
              >
                {t("common.footer.cookiePolicy")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
