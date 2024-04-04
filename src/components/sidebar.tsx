'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { NewPost } from './post/new-post';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Hash } from 'lucide-react';

type Props = {
  className?: string;
};

export function Sidebar({ className }: Props) {
  return (
    <div className={cn('h-screen pb-12 pt-12 lg:border-r ', className)}>
      <div className='space-y-4 py-4 '>
        <div className='px-3 py-2'>
          <div className='mt-1 mb-4'>
            <NewPost />
          </div>

          <div className='py-2'>
            <h2 className='relative px-7 text-lg font-semibold tracking-tight'>
              Clubs
            </h2>
            <ScrollArea className='h-[600px] px-1'>
              <div className='space-y-1 p-2'>
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
          </div>
        </div>
      </div>
    </div>
  );
}
