'use client';

import { usePathname } from 'next/navigation';
import { useConvexAuth } from 'convex/react';
import { Spinner } from '@/components/spinner';
import { SignIn } from '@clerk/clerk-react';
import useStoreUserEffect from '@/lib/useStoreUserEffect';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const userId = useStoreUserEffect();
  const { isLoading, isAuthenticated } = useConvexAuth();

  if (!isLoading && !isAuthenticated) {
    return (
      <div className='h-full flex items-center justify-center'>
        <SignIn redirectUrl={pathname} />
      </div>
    );
  }

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

  return <div>{children}</div>;
}
