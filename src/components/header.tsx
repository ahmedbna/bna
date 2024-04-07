'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ModeToggle } from './mode-toggle';
import { useConvexAuth } from 'convex/react';
import { SignInButton, useUser } from '@clerk/clerk-react';
import { Spinner } from '@/components/spinner';
import { useSearch } from '@/hooks/use-search';
import { Search } from 'lucide-react';
import { AvatarImage, Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AvatarIcon } from '@radix-ui/react-icons';

export const Header = () => {
  const search = useSearch();
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { user } = useUser();

  return (
    <div
      className={cn(
        'z-50 bg-background flex items-center w-full pl-4 pr-2 py-2.5 border-b shadow-sm'
      )}
    >
      <Link href='/' className='flex items-start justify-start gap-x-2'>
        <Image src='/ignite.png' height='22' width='22' alt='Logo' />
        <p className='text-2xl font-black '>BNA</p>
      </Link>
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
