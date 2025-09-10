'use client';
import { DarkModeProvider } from '@/context/DarkModeContext';
import Navbar from '@/components/Navbar';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DarkModeProvider>
          <Navbar />
          <main>{children}</main>
        </DarkModeProvider>
      </body>
    </html>
  );
}
