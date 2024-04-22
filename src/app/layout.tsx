import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import React from "react";
import {CartContextProvider} from "@/store/cartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Products",
  description: "Our listed products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartContextProvider>
          <Navbar />
          {children}
        </CartContextProvider>
      </body>
    </html>
  );
}
