import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coloni App",
  description: "Next Gen Coloni Connect",
};

export default function RootLayout({
  children,
  pathname,
}: Readonly<{
  children: React.ReactNode;
  pathname: any;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
