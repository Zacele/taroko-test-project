import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import ReactQueryProvider from '../Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Taroko test project',
  description: 'Khoa Le project submission for Taroko',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
