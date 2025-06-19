import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sambhav AI | Voice Assistant",
  description: "A stunning modern voice assistant with advanced AI capabilities",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#4f46e5",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Sambhav AI | Voice Assistant",
    description: "A stunning modern voice assistant with advanced AI capabilities",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
      >
        <div className=" w-full h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
