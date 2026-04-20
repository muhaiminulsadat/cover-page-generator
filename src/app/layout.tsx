import type {Metadata} from "next";
import {Geist, Geist_Mono, Inter} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import {cn} from "@/lib/utils";
import {Toaster} from "@/components/ui/sonner";

const inter = Inter({subsets: ["latin"], variable: "--font-sans"});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My App",
  description: "My App Description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-white dark">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
