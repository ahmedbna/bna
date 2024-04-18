'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ModeToggle } from '../mode-toggle';
import { useConvexAuth } from 'convex/react';
import { SignInButton, useUser } from '@clerk/clerk-react';
import { Spinner } from '@/components/spinner';
import { useSearch } from '@/hooks/use-search';
import { Search } from 'lucide-react';
import { AvatarImage, Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AvatarIcon } from '@radix-ui/react-icons';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { NewPost } from '../post/new-post';
import { MobileSidebar } from './mobile-sidebar';

export const MobileHeader = () => {
  const { user } = useUser();
  const search = useSearch();
  const { isLoading, isAuthenticated } = useConvexAuth();

  return (
    <div
      className={cn(
        'z-50 bg-background fixed top-0 flex items-center w-full pl-4 pr-2 py-2.5 border-b shadow-sm'
      )}
    >
      <Link href='/' className='flex items-start justify-start gap-x-2'>
        <Image src='/ignite.png' height='22' width='22' alt='BNA' />
        <p className='text-2xl font-black '>BNA</p>
      </Link>

      <div className='ml-auto justify-end w-full flex items-center'>
        {/* <div>
          <NewPost />
        </div> */}

        <Button variant='ghost' size='icon' onClick={search.toggle}>
          <Search className='h-[1.2rem] w-[1.2rem]' />
          <span className='sr-only'>Search Posts</span>
        </Button>

        <MobileSidebar />
      </div>
    </div>
  );
};
