import type { Metadata } from "next";
import { Oswald, Geist, Geist_Mono } from "next/font/google";
import ClientLayout from "@/components/ClientLayout";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shubhammodi.in"),
  title: {
    default: "Review Portfolio | Shubham Modi",
    template: "%s | Shubham Modi",
  },
  description: "A professional portfolio showcasing full-stack development skills, projects, and experience.",
  keywords: ["Next.js", "React", "Developer", "Portfolio", "Full Stack", "Software Engineer", "Shubham Modi"],
  authors: [{ name: "Shubham Modi" }],
  creator: "Shubham Modi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.shubhammodi.in",
    siteName: "Shubham Modi Portfolio",
    title: "Shubham Modi - Full Stack Developer",
    description: "Explore the portfolio of Shubham Modi, featuring innovative web projects and technical expertise.",
    images: [
      {
        url: "/og-image.jpg", // Ensure you have an og-image.jpg in your public folder
        width: 1200,
        height: 630,
        alt: "Shubham Modi Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubham Modi - Full Stack Developer",
    description: "Creating seamless web experiences with modern technologies.",
    images: ["/og-image.jpg"],
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
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE", // Add your Google Search Console verification code here
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-MXE6CY849Q"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-MXE6CY849Q');
          `}
        </Script>
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} antialiased`}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
        <Analytics />
      </body>
    </html >
  );
}
