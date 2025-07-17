"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
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
      home: "Home",
      about: "About",
      services: "Services",
      contact: "Contact",
      language: "Language",

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
      aboutDescription: "Learn more about our mission and values",
      getStarted: "Get Started",
      contactUs: "Contact Us",
      contactDescription:
        "Ready to start your journey? Get in touch with us today.",
      openForm: "Open Contact Form",
      // Cards
      cardTitle1: "Innovation",
      cardDesc1: "Cutting-edge technology solutions",
      cardTitle2: "Excellence",
      cardDesc2: "Quality service and support",
      cardTitle3: "Growth",
      cardDesc3: "Scalable solutions for your business",
    },
    fr: {
      home: "Accueil",
      about: "À propos",
      services: "Services",
      contact: "Contact",
      language: "Langue",
      heroTitle: "Bienvenue sur Notre Plateforme Extraordinaire",
      heroSubtitle: "Découvrez le pouvoir de l'innovation et de l'excellence",
      heroDescription:
        "Nous fournissons des solutions de pointe qui transforment votre entreprise et stimulent le succès à l'ère numérique.",
      learnMore: "En savoir plus",
      ourServices: "Nos Services",
      servicesDescription:
        "Nous offrons des solutions complètes adaptées à vos besoins",
      aboutUs: "À Propos de Nous",
      aboutDescription: "Découvrez notre mission et nos valeurs",
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
    },
    de: {
      home: "Startseite",
      about: "Über uns",
      services: "Dienstleistungen",
      contact: "Kontakt",
      language: "Sprache",
      heroTitle: "Willkommen auf unserer fantastischen Plattform",
      heroSubtitle: "Entdecken Sie die Kraft von Innovation und Exzellenz",
      heroDescription:
        "Wir bieten modernste Lösungen, die Ihr Unternehmen transformieren und Erfolg im digitalen Zeitalter vorantreiben.",
      learnMore: "Mehr erfahren",
      ourServices: "Unsere Dienstleistungen",
      servicesDescription:
        "Wir bieten umfassende Lösungen, die auf Ihre Bedürfnisse zugeschnitten sind",
      aboutUs: "Über Uns",
      aboutDescription: "Erfahren Sie mehr über unsere Mission und Werte",
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
    },
  };

  const t = (key: string): string => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
