import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/redux/provider";
import { Persistor } from "@/redux/persistort";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    //wrap provider components
    <SessionWrapper>
      <Providers>
        <Persistor>
          <html lang="en">
            <body className={inter.className}>{children}</body>
          </html>
        </Persistor>
      </Providers>
    </SessionWrapper>
  );
}
