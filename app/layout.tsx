import type { Metadata } from "next";
import "./globals.css";
import ToastContainerWrapper from "@/lib/ToastContainerWrapper";
import { NextAuthProvider } from "@/lib/NextAuthProvider";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "Coloni App",
  description: "Next Gen Coloni Connect",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <StoreProvider>{children}</StoreProvider>
        </NextAuthProvider>
        <ToastContainerWrapper />
      </body>
    </html>
  );
}
