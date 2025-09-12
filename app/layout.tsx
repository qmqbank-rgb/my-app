'use client';

import { ReactNode } from 'react';
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
      <body>
        {/* Outer: UserProvider - সব user-related hook safe */}
        <UserProvider>
          {/* Inner: DarkModeProvider */}
          <DarkModeProvider>
            {/* Navbar can use useUser() and useDarkMode() */}
            <Navbar />
            <main>{children}</main>
          </DarkModeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
