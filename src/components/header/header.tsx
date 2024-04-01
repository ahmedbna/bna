'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Logo } from './logo';
import { ModeToggle } from '../mode-toggle';
import { useConvexAuth } from 'convex/react';
import { SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { Spinner } from '@/components/spinner';
import { useSearch } from '@/hooks/use-search';
import { Search } from 'lucide-react';

export const Header = () => {
  const search = useSearch();
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { user } = useUser();

  // console.log(user);

  return (
    <div
      className={cn(
        'z-50 bg-background fixed top-0 flex items-center w-full px-6 py-2.5 border-b shadow-sm'
      )}
    >
      <Logo />
      <div className='md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2'>
        <Button variant='ghost' size='icon' onClick={search.toggle}>
          <Search className='h-[1.2rem] w-[1.2rem]' />
          <span className='sr-only'>Search Posts</span>
        </Button>
        <ModeToggle />
        {isLoading && <Spinner />}
        {!isLoading && !isAuthenticated && (
          <>
            <SignInButton mode='modal'>
              <Button size='sm'>Login</Button>
            </SignInButton>
          </>
        )}
        {!isLoading && isAuthenticated && (
          <>
            {/* <Button variant='ghost' size='sm' asChild>
              <Link href='/documents'>Qalam</Link>
            </Button> */}
            <UserButton afterSignOutUrl='/' />
          </>
        )}
      </div>
    </div>
  );
};
