import React from "react";
import MainContent from "./components/MainContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Horizon Talents",
  description:
    "Find your dream job with Horizon Talents. Browse through job opportunities across different industries and start your career journey today.",
};

const Home: React.FC = () => {
  return <MainContent />;
};

export default Home;
