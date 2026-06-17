import type {Metadata} from "next";
import {Geist, Geist_Mono, Inter, Outfit} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import {ThemeProvider} from "@/components/theme-provider";
import OnboardingGuard from "@/components/OnboardingGuard";
import {cn} from "@/lib/utils";
import {Toaster} from "react-hot-toast";
import {Suspense} from "react";

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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://coverde.me",
  ),
  title: "CoverDe - Cover Page Generator for University Courses.",
  description:
    "Generate professional top sheets for your university assignments.",
  applicationName: "CoverDe",
  openGraph: {
    title: "CoverDe - Cover Page Generator.",
    description:
      "Generate professional top sheets for your university assignments.",
    siteName: "CoverDe",
    url: "/",
    images: [
      {
        url: "https://ik.imagekit.io/muhaiminulsadat/CoverDe/image.png",
        width: 1200,
        height: 630,
        alt: "CoverDe - Cover Page Generator Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CoverDe - Cover Page Generator.",
    description:
      "Generate professional top sheets for your university assignments.",
    images: ["https://ik.imagekit.io/muhaiminulsadat/CoverDe/image.png"],
  },
  appleWebApp: {
    title: "CoverDe",
    statusBarStyle: "default",
  },
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
      data-scroll-behavior="smooth"
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
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
