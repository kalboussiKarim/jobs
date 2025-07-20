"use client";

import React from "react";
import HeroSection from "./sections/HeroSection";
import ServicesSection from "./sections/ServicesSection";
import AboutSection from "./sections/AboutSection";
import WhyChooseUsSection from "./sections/WhyChooseUsSection";
import ApplyNowSection from "./sections/ApplyNowSection";
import ProcessusSection from "./sections/ProcessusSection";
import StatsSection from "./sections/StatsSection";

const MainContent: React.FC = () => {
  return (
    <div className="transition-colors duration-300">
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <ProcessusSection />

      <AboutSection />
      <WhyChooseUsSection />

      <ApplyNowSection />
    </div>
  );
};

export default MainContent;
