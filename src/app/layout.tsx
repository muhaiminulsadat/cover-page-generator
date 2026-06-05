import type {Metadata} from "next";
import {Geist, Geist_Mono, Inter, Outfit} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import {ThemeProvider} from "@/components/theme-provider";
import OnboardingGuard from "@/components/OnboardingGuard";
import {cn} from "@/lib/utils";
import {Toaster} from "react-hot-toast";
import {Suspense} from "react";
import {LenisProvider} from "@/components/LenisProvider";

const inter = Inter({subsets: ["latin"], variable: "--font-sans"});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CoverDe - Cover Page Generator for University Courses.",
  description:
    "Generate professional top sheets for your university assignments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
        outfit.variable,
      )}
    >
      <body className="min-h-full flex flex-col text-foreground">
        <Suspense fallback={null}>
          <ThemeProvider>
            <LenisProvider>
              <Suspense
                fallback={
                  <div className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-background" />
                }
              >
                <Navbar />
              </Suspense>
              <OnboardingGuard />
              <main className="flex-1 pt-16">{children}</main>
              <Toaster position="top-center" />
            </LenisProvider>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
