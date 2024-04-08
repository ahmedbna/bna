import type { Metadata } from 'next';
import { ThemeProvider } from '@/providers/theme-provider';
import { ClerkProvider } from '@/providers/clerk-provider';
import { Toaster } from '@/components/ui/sonner';
import { Inter } from 'next/font/google';
import { SearchCommand } from '@/components/search';
import { EdgeStoreProvider } from '@/lib/edgestore';
import { Sidebar } from '@/components/sidebar';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import '@/styles/globals.css';
import '@mantine/core/styles.css';
import { Header } from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'BNA',
    template: 'BNA | %s',
  },
  description: 'Ignite Creativity!',
  metadataBase: new URL('https://ahmedbna.com'),
  openGraph: {
    title: 'BNA',
    description: 'Ignite Creativity!',
    url: 'https://ahmedbna.com',
    siteName: 'BNA',
    images: [
      {
        url: '/bna.png',
        width: 800,
        height: 800,
        alt: 'BNA',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BNA',
    description: 'Ignite Creativity!',
    images: ['/bna.png'],
  },
  icons: {
    icon: '/_icons/apple-touch-icon.png',
    shortcut: '/_icons/apple-touch-icon.png',
    apple: '/_icons/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/_icons/apple-touch-icon.png',
    },
  },
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
  appLinks: {
    // ios: {
    //   url: 'https://nextjs.org/ios',
    //   app_store_id: 'app_store_id',
    // },
    // android: {
    //   package: 'com.example.android/package',
    //   app_name: 'app_name_android',
    // },
    web: {
      url: 'https://ahmedbna.com/',
      should_fallback: true,
    },
  },
  verification: {
    google: 'google-site-verification=id',
  },
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
              storageKey='bna-theme'
              disableTransitionOnChange
            >
              <SearchCommand />

              <ResizablePanelGroup direction='horizontal'>
                <ResizablePanel defaultSize={20}>
                  <Sidebar />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel>
                  <div className='flex h-full items-center justify-center'>
                    <main className='h-full w-full overflow-y-auto'>
                      {children}
                    </main>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>

              <Toaster position='top-center' />
            </ThemeProvider>
          </EdgeStoreProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
