import type { Metadata } from 'next';
import { ThemeProvider } from '@/providers/theme-provider';
import { ClerkProvider } from '@/providers/clerk-provider';
import { Header } from '@/components/header/header';
import { Toaster } from '@/components/ui/sonner';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import '@mantine/core/styles.css';
import { SearchCommand } from '@/components/search';
import { EdgeStoreProvider } from '@/lib/edgestore';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Qalam',
  description: 'Connecting Minds',
  // icons: {
  //   icon: [
  //     {
  //       media: 'prefer-color-scheme: light',
  //       url: '/favicon-light.svg',
  //       href: '/favicon-light.svg',
  //     },
  //     {
  //       media: 'prefer-color-scheme: dark',
  //       url: '/favicon-dark.svg',
  //       href: '/favicon-dark.svg',
  //     },
  //   ],
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ClerkProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              enableSystem
              attribute='class'
              defaultTheme='system'
              storageKey='qalam-theme'
              disableTransitionOnChange
            >
              <Header />
              <SearchCommand />
              <main className='h-full w-full pt-20'>{children}</main>
              <Toaster position='top-center' />
            </ThemeProvider>
          </EdgeStoreProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
