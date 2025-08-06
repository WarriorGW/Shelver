import BodyWrapper from "@/components/BodyWrapper";
import Navbar from "@/components/Navbar";
import SessionInitializer from "@/components/SessionInitializer";
import QueryProvider from "@/util/QueryProvider";
import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-onest",
});

export const metadata: Metadata = {
  title: "Shelver",
  description: "Tienda de libros online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${onest.variable}`}>
      <body className="font-onest">
        <QueryProvider>
          <SessionInitializer />
          <Navbar />
          <BodyWrapper>{children}</BodyWrapper>
        </QueryProvider>
      </body>
    </html>
  );
}
