"use client";

import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../../lib/LanguageContext";
import Navbar from "../../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
