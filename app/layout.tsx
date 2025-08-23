import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";   // Navbar import
import { DarkModeProvider } from "@/context/DarkModeContext"; // Dark Mode import

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QmqBank",
  description: "QmqBank App with Navbar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        {/* Dark Mode Provider wraps Navbar + all pages */}
        <DarkModeProvider>
          <Navbar /> {/* একবারই থাকবে, সব পেজে share হবে */}
          <main className="min-h-screen">{children}</main>
        </DarkModeProvider>
      </body>
    </html>
  );
}
