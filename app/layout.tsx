'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { UserProvider } from '../context/UserContext';
import { DarkModeProvider } from '@/context/DarkModeContext';
import Navbar from '@/components/Navbar';
import './globals.css';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* Preload logo as image */}
        <link rel="preload" href="/qmqbank_logo.svg" as="image" />
      </head>
      <body>
        <SessionProvider>
          <UserProvider>
            <DarkModeProvider>
              <Navbar />
              <main>{children}</main>
            </DarkModeProvider>
          </UserProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
