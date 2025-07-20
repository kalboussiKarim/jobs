"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type TranslationValue = string | { [key: string]: TranslationValue };

interface Translations {
  [languageCode: string]: TranslationValue;
}

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<string>("en");

  const translations: Translations = {
    en: {
      common: {
        home: "Home",
        about: "About",
        services: "Services",
        contact: "Contact",
        language: "Language",
        apply: "Apply Now",
      },

      hero: {
        title: "Your Gateway to Europe",
        subtitle: "Discover the power of innovation and excellence",
        description:
          "We support talented individuals from the Maghreb (Tunisia, Morocco, Algeria) in finding professional opportunities in the European Union. From job searches to obtaining the EU Blue Card.",
        button: "See our processes",
      },

      // New translations for content sections
      heroTitle: "Welcome to Our Amazing Platform",
      heroSubtitle: "Discover the power of innovation and excellence",
      heroDescription:
        "We provide cutting-edge solutions that transform your business and drive success in the digital age.",
      learnMore: "Learn More",
      ourServices: "Our Services",
      servicesDescription:
        "We offer comprehensive solutions tailored to your needs",
      aboutUs: "About Us",
      aboutDescription: "Your partner for a successful European career",
      getStarted: "Get Started",
      contactUs: "Contact Us",
      contactDescription:
        "Ready to start your journey? Get in touch with us today.",
      openForm: "Open Contact Form",
      WhyChooseUs: "Why Choose Us?",
      // Cards
      cardTitle1: "Innovation",
      cardDesc1: "Cutting-edge technology solutions",
      cardTitle2: "Excellence",
      cardDesc2: "Quality service and support",
      cardTitle3: "Growth",
      cardDesc3: "Scalable solutions for your business",
      // Footer translations
      footerDescription:
        "We provide cutting-edge solutions that transform your business and drive success in the digital age.",
      quickLinks: "Quick Links",

      webDevelopment: "Web Development",
      mobileApps: "Mobile Apps",
      consulting: "Consulting",
      support: "Support",
      company: "Company",

      careers: "Careers",
      blog: "Blog",
      news: "News",
      contactInfo: "Contact Info",
      address: "123 Business Street, City, Country",
      phone: "+1 (555) 123-4567",
      email: "info@myapp.com",
      followUs: "Follow Us",
      allRightsReserved: "All rights reserved.",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      cookiePolicy: "Cookie Policy",
      //WhatsApp Bubble
      Needhelp: "Need help? Chat with us!",
    },
    fr: {
      common: {
        home: "Accueil",
        about: "À propos",
        services: "Services",
        contact: "Contact",
        language: "Langue",
        apply: "Postulez maintenant",
      },
      hero: {
        title: "Votre Passerelle vers l'Europe",
        subtitle: "Discover the power of innovation and excellence",
        description:
          "Nous accompagnons les talents du Maghreb (Tunisie, Maroc, Algérie) dans leur recherche d'opportunités professionnelles au sein de l'Union européenne. De la recherche d'emploi à l'obtention de la carte bleue européenne.",
        button: "Découvrez nos processus",
      },

      heroTitle: "Bienvenue sur Notre Plateforme Extraordinaire",
      heroSubtitle: "Découvrez le pouvoir de l'innovation et de l'excellence",
      heroDescription:
        "Nous fournissons des solutions de pointe qui transforment votre entreprise et stimulent le succès à l'ère numérique.",
      learnMore: "En savoir plus",
      ourServices: "Nos Services",
      WhyChooseUs: "Pourquoi nous choisir ?",
      servicesDescription:
        "Nous offrons des solutions complètes adaptées à vos besoins",
      aboutUs: "À Propos de Nous",
      aboutDescription: "Votre partenaire pour une carrière européenne réussie",
      getStarted: "Commencer",
      contactUs: "Contactez-nous",
      contactDescription:
        "Prêt à commencer votre parcours ? Contactez-nous dès aujourd'hui.",
      openForm: "Ouvrir le formulaire de contact",
      // Cards
      cardTitle1: "Innovation",
      cardDesc1: "Solutions technologiques de pointe",
      cardTitle2: "Excellence",
      cardDesc2: "Service et support de qualité",
      cardTitle3: "Croissance",
      cardDesc3: "Solutions évolutives pour votre entreprise",
      // Footer translations
      footerDescription:
        "Nous fournissons des solutions de pointe qui transforment votre entreprise et stimulent le succès à l'ère numérique.",
      quickLinks: "Liens Rapides",

      webDevelopment: "Développement Web",
      mobileApps: "Applications Mobiles",
      consulting: "Conseil",
      support: "Support",
      company: "Entreprise",

      careers: "Carrières",
      blog: "Blog",
      news: "Actualités",
      contactInfo: "Informations de Contact",
      address: "123 Rue des Affaires, Ville, Pays",
      phone: "+1 (555) 123-4567",
      email: "info@myapp.com",
      followUs: "Suivez-nous",
      allRightsReserved: "Tous droits réservés.",
      privacyPolicy: "Politique de Confidentialité",
      termsOfService: "Conditions d'Utilisation",
      cookiePolicy: "Politique des Cookies",
      //WhatsApp Bubble
      Needhelp: "Besoin d'aide ? Discutez avec nous !",
    },
    de: {
      common: {
        home: "Startseite",
        about: "Über uns",
        services: "Dienstleistungen",
        contact: "Kontakt",
        language: "Sprache",
        apply: "Jetzt bewerben",
      },
      hero: {
        title: "Ihr Tor nach Europa",

        description:
          "Wir unterstützen talentierte Menschen aus dem Maghreb (Tunesien, Marokko, Algerien) bei der Suche nach beruflichen Möglichkeiten in der Europäischen Union. Von der Jobsuche bis zum Erhalt der Blauen Karte EU.",
        button: "Sehen Sie sich unsere Prozesse an",
      },

      heroTitle: "Willkommen auf unserer fantastischen Plattform",
      heroSubtitle: "Entdecken Sie die Kraft von Innovation und Exzellenz",
      heroDescription:
        "Wir bieten modernste Lösungen, die Ihr Unternehmen transformieren und Erfolg im digitalen Zeitalter vorantreiben.",
      learnMore: "Mehr erfahren",
      ourServices: "Unsere Dienstleistungen",
      WhyChooseUs: "Warum uns wählen?",
      servicesDescription:
        "Wir bieten umfassende Lösungen, die auf Ihre Bedürfnisse zugeschnitten sind",
      aboutUs: "Über Uns",
      aboutDescription:
        "Ihr Partner für eine erfolgreiche europäische Karriere",
      getStarted: "Loslegen",
      contactUs: "Kontaktieren Sie uns",
      contactDescription:
        "Bereit, Ihre Reise zu beginnen? Kontaktieren Sie uns noch heute.",
      openForm: "Kontaktformular öffnen",
      // Cards
      cardTitle1: "Innovation",
      cardDesc1: "Modernste Technologielösungen",
      cardTitle2: "Exzellenz",
      cardDesc2: "Qualitätsservice und Support",
      cardTitle3: "Wachstum",
      cardDesc3: "Skalierbare Lösungen für Ihr Unternehmen",
      // Footer translations
      footerDescription:
        "Wir bieten modernste Lösungen, die Ihr Unternehmen transformieren und Erfolg im digitalen Zeitalter vorantreiben.",
      quickLinks: "Schnelllinks",

      webDevelopment: "Webentwicklung",
      mobileApps: "Mobile Apps",
      consulting: "Beratung",
      support: "Support",
      company: "Unternehmen",

      careers: "Karriere",
      blog: "Blog",
      news: "Nachrichten",
      contactInfo: "Kontaktinformationen",
      address: "123 Geschäftsstraße, Stadt, Land",
      phone: "+1 (555) 123-4567",
      email: "info@myapp.com",
      followUs: "Folgen Sie uns",
      allRightsReserved: "Alle Rechte vorbehalten.",
      privacyPolicy: "Datenschutzrichtlinie",
      termsOfService: "Nutzungsbedingungen",
      cookiePolicy: "Cookie-Richtlinie",
      //WhatsApp Bubble
      Needhelp: "Brauchen Sie Hilfe? Chatten Sie mit uns!",
    },
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let result: any = translations[language];

    for (const k of keys) {
      if (typeof result !== "object" || result === null || !(k in result)) {
        return key; // fallback to the key if path is invalid
      }
      result = result[k];
    }

    return typeof result === "string" ? result : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
