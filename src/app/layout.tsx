"use client";

import React from "react";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import { LanguageProvider } from "./lib/LanguageContext";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { ThemeProvider } from "./lib/ThemeContext";
import WhatsAppBubble from "./components/common/WhatsAppBubble";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
              <WhatsAppBubble />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
