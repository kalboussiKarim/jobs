"use client";

import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../../lib/LanguageContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ThemeProvider } from "../../lib/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
