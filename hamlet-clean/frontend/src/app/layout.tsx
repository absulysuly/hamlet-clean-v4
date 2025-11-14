import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hamlet Unified - Iraq Election 2025',
  description: 'Complete civic technology platform for Iraq\'s 2025 National Election',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
