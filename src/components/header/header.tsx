'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Logo } from './logo';
import { ModeToggle } from '../mode-toggle';
import { useConvexAuth } from 'convex/react';
import { SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { Spinner } from '@/components/spinner';
import { useSearch } from '@/hooks/use-search';
import { CircleUserRound, Search } from 'lucide-react';
import { AvatarImage, Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { AvatarIcon } from '@radix-ui/react-icons';

export const Header = () => {
  const search = useSearch();
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { user } = useUser();

  return (
    <div
      className={cn(
        'z-50 bg-background flex items-center w-full pl-6 pr-2 py-2.5 border-b shadow-sm'
      )}
    >
      <Logo />
      <div className='ml-auto justify-end w-full flex items-center'>
        <Button variant='ghost' size='icon' onClick={search.toggle}>
          <Search className='h-[1.2rem] w-[1.2rem]' />
          <span className='sr-only'>Search Posts</span>
        </Button>
        <ModeToggle />

        {isLoading && <Spinner />}
        {!isLoading && !isAuthenticated && (
          <>
            <SignInButton mode='modal'>
              <Button className='p-1.5' variant='ghost'>
                <AvatarIcon className='w-6 h-6' />
              </Button>
            </SignInButton>
          </>
        )}
        {!isLoading && isAuthenticated && (
          <Link href='/me'>
            <Avatar className='h-7 w-7 ml-2'>
              <AvatarImage src={user?.imageUrl} alt={user?.fullName || ''} />
              <AvatarFallback>
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </Link>
        )}
      </div>
    </div>
  );
};
