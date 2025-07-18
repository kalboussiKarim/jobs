"use client";

import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../../lib/LanguageContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ThemeProvider } from "../../lib/ThemeContext";
import WhatsAppBubble from "../../components/WhatsAppBubble";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
              <WhatsAppBubble
                phoneNumber="1234567890"
                message="Hello! I'm interested in your services."
                position="bottom-right"
              />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
