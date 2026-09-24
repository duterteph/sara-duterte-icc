import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Understanding Sara Duterte & the ICC",
    template: "%s | Understanding Sara Duterte & the ICC",
  },
  description:
    "An independent informational resource covering Sara Duterte, the International Criminal Court, relevant timelines, official statements, documents, news updates, and legal context.",
  keywords: [
    "Sara Duterte",
    "ICC",
    "International Criminal Court",
    "Philippines",
    "timeline",
    "documents",
    "legal context",
  ],
  authors: [{ name: "Independent Informational Project" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sara-duterte-icc.vercel.app",
    siteName: "Understanding Sara Duterte & the ICC",
    title: "Understanding Sara Duterte & the ICC",
    description:
      "Facts, timelines, documents, and legal context — presented with sources.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Understanding Sara Duterte & the ICC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Understanding Sara Duterte & the ICC",
    description:
      "Facts, timelines, documents, and legal context — presented with sources.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
