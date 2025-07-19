"use client";

import React, { useState } from "react";
import ContactModal from "./ContactModal";
import HeroSection from "./sections/HeroSection";
import CardsSection from "./sections/CardsSection";
import ServicesSection from "./sections/ServicesSection";
import AboutSection from "./sections/AboutSection";
import WhyChooseUsSection from "./sections/WhyChooseUsSection";
import ApplyNowSection from "./sections/ApplyNowSection";

const MainContent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="transition-colors duration-300">
      <HeroSection />
      <CardsSection />
      <ServicesSection />
      <AboutSection />
      <WhyChooseUsSection />
      <ApplyNowSection openModal={() => setIsModalOpen(true)} />

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default MainContent;
