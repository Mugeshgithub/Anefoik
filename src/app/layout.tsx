'use client';

import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/contexts/theme-context';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Aniefiok - Musical Portfolio</title>
        <meta name="description" content="Professional keyboardist, composer, and producer specializing in jazz, gospel, pop, and contemporary Christian music. Experience soul-stirring melodies that connect hearts and inspire spirits." />
      </head>
      <body className="min-h-screen transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
