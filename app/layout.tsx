import type { Metadata } from "next";
import { Libre_Franklin, Source_Serif_4 } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AS_OF } from "@/lib/currencies";
import "./globals.css";

const sans = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-sans-face",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif-face",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Stablecoin desk — issue vs resell, eight currencies",
    template: "%s · Stablecoin desk",
  },
  description: `Who may mint, and who may only sell someone else’s coin. USD, EUR, JPY, TRY, THB, VND, PHP, KRW. Desk as of ${AS_OF}. Not legal advice.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
