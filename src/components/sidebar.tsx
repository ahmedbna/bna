'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Hash } from 'lucide-react';
import { AvatarImage, Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Header } from './header';
import { NewPost } from './post/new-post';
import { ProCard } from './pro/pro-card';

export const Sidebar = () => {
  return (
    <div>
      <Header />
      <div className='space-y-4 py-4'>
        <div className='px-3 py-2'>
          <div>
            <NewPost />
          </div>

          <div className='mt-8'>
            <ProCard />
          </div>

          {/* <div className='py-2'>
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

                {clubs?.map((club) => (
                  <Button
                    key={club._id}
                    variant='ghost'
                    className='w-full justify-start font-normal'
                  >
                    <Hash className='h-4 w-4 mr-2' />
                    {club.name}
                  </Button>
                ))} 
              </div>
            </ScrollArea>
          </div> */}
        </div>
      </div>
    </div>
  );
};
