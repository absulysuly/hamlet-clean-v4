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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
