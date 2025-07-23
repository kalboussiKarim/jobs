"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import en from "../locales/en.json";
import fr from "../locales/fr.json";
import de from "../locales/de.json";

type TranslationValue = string | { [key: string]: TranslationValue };
type Translations = Record<string, TranslationValue>;

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
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

const allTranslations: Record<string, Translations> = {
  en,
  fr,
  de,
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguageState] = useState("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang) {
      setLanguageState(storedLang);
    }
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem("lang", lang);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let result: any = allTranslations[language];

    for (const k of keys) {
      if (typeof result !== "object" || result === null || !(k in result)) {
        return key;
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
/* const translations: Translations = {
    en: {
      
      learnMore: "know moreeeee",
      ourServices: "Our services",
      
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
        return key;
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
*/
