import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My App",
  description: "A simple Next.js app with navigation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        {/* Navbar */}
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <nav>
            <ul className="flex gap-6 text-lg font-semibold">
              <li>
                <Link href="/" className="hover:underline">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">About</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">Contact</Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-grow p-6">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white p-4 text-center">
          <p>© {new Date().getFullYear()} My App. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
