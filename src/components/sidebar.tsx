'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { NewPost } from './post/new-post';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Hash } from 'lucide-react';
import { Header } from './header';
import { AvatarImage, Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useConvexAuth } from 'convex/react';
import { SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { Spinner } from '@/components/spinner';

export const Sidebar = () => {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { user } = useUser();

  return (
    <div>
      <Header />
      <div className='space-y-4 py-4'>
        <div className='px-3 py-2'>
          <div className='mt-1 mb-4'>
            <NewPost />
          </div>

          <div className='py-2'>
            <h2 className='relative px-7 text-xl font-bold tracking-tight'>
              Clubs
            </h2>
            <ScrollArea className='h-[600px] px-1'>
              <div className='space-y-1 p-2'>
                <Link href='/'>
                  <Button
                    variant='ghost'
                    className='w-full justify-start px-7 font-normal'
                  >
                    For you
                  </Button>
                </Link>

                <Button
                  variant='ghost'
                  className='w-full justify-start font-normal'
                >
                  <Hash className='h-4 w-4 mr-2' />
                  html
                </Button>
                <Button
                  variant='ghost'
                  className='w-full justify-start font-normal'
                >
                  <Hash className='h-4 w-4 mr-2' />
                  css
                </Button>
                <Button
                  variant='ghost'
                  className='w-full justify-start font-normal'
                >
                  <Hash className='h-4 w-4 mr-2' />
                  javascript
                </Button>

                {/* {clubs?.map((club) => (
                  <Button
                    key={club._id}
                    variant='ghost'
                    className='w-full justify-start font-normal'
                  >
                    <Hash className='h-4 w-4 mr-2' />
                    {club.name}
                  </Button>
                ))} */}
              </div>
            </ScrollArea>

            {/* {!isLoading ? (
              <div className='flex-end bg-zinc-800 p-2 mx-4 rounded-lg'>
                {!isLoading && !isAuthenticated && (
                  <SignInButton mode='modal'>
                    <Button size='sm'>Login</Button>
                  </SignInButton>
                )}

                {!isLoading && isAuthenticated && (
                  <Link href='/me'>
                    <div className='flex items-end'>
                      <Avatar className='h-14 w-14 rounded-lg'>
                        <AvatarImage
                          src={user?.imageUrl}
                          alt={user?.fullName || ''}
                        />
                        <AvatarFallback>
                          {user?.firstName?.charAt(0)}
                          {user?.lastName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className='ml-2'>
                        <p className='text-md font-bold leading-none'>
                          {user?.fullName}
                        </p>
                        <p className='text-xs text-muted-foreground'>
                          {user?.primaryEmailAddress?.emailAddress}
                        </p>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            ) : null} */}
          </div>
        </div>
      </div>
    </div>
  );
};
