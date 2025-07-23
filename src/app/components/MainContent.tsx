"use client";

import React from "react";
import HeroSection from "./sections/HeroSection";
import ServicesSection from "./sections/ServicesSection";
import AboutSection from "./sections/AboutSection";
import ApplyNowSection from "./sections/ApplyNowSection";
import ProcessusSection from "./sections/ProcessusSection";
import StatsSection from "./sections/StatsSection";

const MainContent: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <StatsSection />
      <ProcessusSection />
      <ApplyNowSection />
    </div>
  );
};

export default MainContent;
