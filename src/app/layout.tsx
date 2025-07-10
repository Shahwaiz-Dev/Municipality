import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import CookieConsent from './components/CookieConsent';

export const metadata: Metadata = {
  title: 'Agios Athanasios Municipality',
  description: 'Official website of Agios Athanasios Municipality',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg-light text-text-dark font-sans">
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
