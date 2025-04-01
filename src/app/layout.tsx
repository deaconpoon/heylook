import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "../styles/globals.css";
import ReduxProvider from "@/components/providers/ReduxProvider";
import ThemeToggle from "../components/atoms/ThemeToggle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HeyLook - Visual QA & Design Feedback Tool",
  description: "Streamline your QA process and design feedback workflow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="relative">
        <ReduxProvider>
          <header className="fixed top-4 right-4 z-50">
            <ThemeToggle />
          </header>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
