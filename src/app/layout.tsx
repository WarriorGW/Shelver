import BodyWrapper from "@/components/BodyWrapper";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";

export const onest = Onest({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-onest",
});

export const metadata: Metadata = {
  title: "Test",
  description: "Proyecto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${onest.variable}`}>
      <body className="font-onest">
        <Navbar />
        <BodyWrapper>{children}</BodyWrapper>
      </body>
    </html>
  );
}
