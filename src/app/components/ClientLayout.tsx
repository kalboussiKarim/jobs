"use client";

import React from "react";
import { LanguageProvider } from "../lib/LanguageContext";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import { ThemeProvider } from "../lib/ThemeContext";
import WhatsAppBubble from "./common/WhatsAppBubble";
import { AuthProvider } from "../lib/AuthContext";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <WhatsAppBubble />
          </div>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
