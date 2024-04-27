import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToastContainerWrapper from "@/lib/ToastContainerWrapper";
import { NextAuthProvider } from "@/lib/NextAuthProvider";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coloni App",
  description: "Next Gen Coloni Connect",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  pathname: any;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <StoreProvider>{children}</StoreProvider>
        </NextAuthProvider>
        <ToastContainerWrapper />
      </body>
    </html>
  );
}
