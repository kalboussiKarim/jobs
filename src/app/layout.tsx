import React from "react";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import { Metadata } from "next";
import ClientLayout from "./components/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

// Export metadata for SEO
export const metadata: Metadata = {
  title: "Horizon Talents - Your Career Opportunities Await",
  description:
    "Discover exciting job opportunities with Horizon Talents Jobs. We connect talented professionals with leading companies across various industries. Apply now and advance your career.",
  keywords: "jobs, career, employment, opportunities, recruitment, hiring",
  authors: [{ name: "Brice Carty" }],
  openGraph: {
    title: "Horizon Talents Jobs - Your Career Opportunities Await",
    description:
      "Discover exciting job opportunities with Horizon Talents Jobs. We connect talented professionals with leading companies across various industries.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Horizon Talents Jobs - Your Career Opportunities Await",
    description:
      "Discover exciting job opportunities with Horizon Talents Jobs. We connect talented professionals with leading companies across various industries.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={inter.className} suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
