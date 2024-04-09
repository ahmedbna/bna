'use client';

import { ReactNode } from 'react';
import { Sidebar } from '@/components/sidebar';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Header } from '@/components/header';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Footer } from './footer';

type Props = {
  children: ReactNode;
};

export const Home = ({ children }: Props) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <>
      {isDesktop ? (
        <ResizablePanelGroup direction='horizontal'>
          <ResizablePanel defaultSize={20}>
            <Sidebar />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>
            <div className='flex h-full items-center justify-center'>
              <main className='h-full w-full overflow-y-auto'>{children}</main>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <div className='flex h-full items-center justify-center'>
          <main className='h-full w-full overflow-y-auto'>{children}</main>
          <Footer />
        </div>
      )}
    </>
  );
};
