'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from './header';
import { NewPost } from './post/new-post';
import { ProPlan } from './pro/pro-plan';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Spinner } from './spinner';

export const Sidebar = () => {
  const clubs = useQuery(api.clubs.getClubs);

  if (clubs === undefined) {
    return (
      <div className='h-full flex items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  // if (clubs === null) {
  //   return (
  //     <div className='h-full flex items-center justify-center'>
  //       <div>Not found</div>
  //     </div>
  //   );
  // }

  return (
    <div className='h-full'>
      <Header />

      <div className='h-full flex flex-col gap-4 px-3 pt-4'>
        <NewPost />

        <div className='flex-1 overflow-y-auto'>
          <h2 className='px-5 text-xl font-bold tracking-tight'>Clubs</h2>

          <div className='space-y-1 p-2'>
            {clubs?.map((club) => (
              <Button
                asChild
                key={club._id}
                variant='ghost'
                className='w-full items-center justify-start font-normal'
              >
                <Link href={`/club/${club.slug}`}>{club.name}</Link>
              </Button>
            ))}
          </div>
        </div>

        <div className='mb-16'>
          <ProPlan />
        </div>
      </div>
    </div>
  );
};
