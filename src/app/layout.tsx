import type { Metadata } from 'next';
import { ThemeProvider } from '@/providers/theme-provider';
import { ClerkProvider } from '@/providers/clerk-provider';
import { Toaster } from '@/components/ui/sonner';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import '@mantine/core/styles.css';
import { SearchCommand } from '@/components/search';
import { EdgeStoreProvider } from '@/lib/edgestore';
import { Sidebar } from '@/components/sidebar';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BNA',
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
