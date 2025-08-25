"use client";

import React from "react";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import { LanguageProvider } from "./lib/LanguageContext";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { ThemeProvider } from "./lib/ThemeContext";
import WhatsAppBubble from "./components/common/WhatsAppBubble";
import { AuthProvider } from "./lib/AuthContext";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={inter.className} suppressHydrationWarning>
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
      </body>
    </html>
  );
}
