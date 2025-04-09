import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Riddimz Karaoke',
  description: 'Decentralized Karaoke Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}