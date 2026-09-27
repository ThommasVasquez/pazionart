import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pazionart.com"),
  title: "Pazionart | Amor · Naturaleza · Arte — Chalets & Experiencias",
  description:
    "El puente entre la sabiduría artesanal rural y la pausa consciente. Una experiencia multisensorial donde el arte, la naturaleza y la hospitalidad se encuentran.",
  keywords: [
    "Pazionart",
    "Pazionart Chalets",
    "Pausa Consciente",
    "Artesanía Rural",
    "Naturaleza y Arte",
    "Hospitalidad Multisensorial",
    "Glamping de Lujo",
    "Ecolodge Consciente",
  ],
  authors: [{ name: "Pazionart" }],
  icons: {
    icon: [
      { url: "/brand/favicon-pazionart.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/brand/apple-touch-icon.png",
  },
  openGraph: {
    title: "Pazionart | Amor · Naturaleza · Arte",
    description:
      "Una experiencia multisensorial donde el arte, la naturaleza y la hospitalidad se encuentran. Chalets boutique y refugios de pausa consciente.",
    url: "https://pazionart.com",
    siteName: "Pazionart",
    images: [
      {
        url: "/images/hero-chalet.jpg",
        width: 1920,
        height: 1080,
        alt: "Pazionart Chalet en la naturaleza",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#212B20",
  width: "device-width",
  initialScale: 1,
};

import { PreferencesProvider } from "@/context/PreferencesContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full font-sans selection:bg-[#A45D41] selection:text-[#F5F2ED] transition-colors duration-500">
        <PreferencesProvider>{children}</PreferencesProvider>
      </body>
    </html>
  );
}
