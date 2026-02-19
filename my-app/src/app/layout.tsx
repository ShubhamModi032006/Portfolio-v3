import type { Metadata } from "next";
import { Oswald, Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

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
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col lg:flex-row overflow-x-hidden max-w-full">
          {/* Sidebar Area */}
          <div className="lg:w-[45%] lg:fixed lg:inset-y-0 lg:z-40 shrink-0">
            <Sidebar />
          </div>

          {/* Main Content Area */}
          <main className="w-full min-w-0 lg:w-[55%] lg:ml-[45%] min-h-screen bg-black text-slate-400 pt-16 lg:pt-0 overflow-x-hidden">
            {children}
            <Analytics />
          </main>
        </div>
      </body>
    </html >
  );
}
