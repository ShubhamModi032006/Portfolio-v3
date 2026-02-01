import type { Metadata } from "next";
import { Oswald, Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

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
  title: "Portfolio",
  description: "Developer Portfolio",
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
          </main>
        </div>
      </body>
    </html >
  );
}
