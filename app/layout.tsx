import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coloni App",
  description: "Next Gen Coloni Connect",
};

export default async function RootLayout({
  children,
  pathname,
}: Readonly<{
  children: React.ReactNode;
  pathname: any;
}>) {
  const session = await getServerSession();
  console.log(session, "seeXs");
  return (
    // <SessionProvider>
    <html lang="en">
      <body className={inter.className}>
        {/* <nav></nav> */}
        {children}
      </body>
    </html>
    // </SessionProvider>
  );
}
