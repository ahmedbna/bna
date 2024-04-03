'use client';

import { redirect } from 'next/navigation';
import { useConvexAuth } from 'convex/react';
import { Spinner } from '@/components/spinner';
import useStoreUserEffect from '@/lib/useStoreUserEffect';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = useStoreUserEffect();
  const { isLoading, isAuthenticated } = useConvexAuth();

  if (userId === null) {
    // Storing User
    return (
      <div className='h-full flex items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (isLoading) {
    // Loading User
    return (
      <div className='h-full flex items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect('/login');
  }

  return (
    <div className='h-full md:max-w-5xl lg:max-w-6xl mx-auto'>{children}</div>
  );
}
