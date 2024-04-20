'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from './header';
import { NewPost } from '../post/new-post';
import { ProPlan } from '../pro/pro-plan';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Spinner } from '../spinner';
import { Doc } from '@/convex/_generated/dataModel';
import { useRouter } from 'next/navigation';

export const Sidebar = () => {
  const router = useRouter();
  const clubs = useQuery(api.clubs.getClubs);
  const join = useMutation(api.clubguests.join);

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

  const handleJoinClubhouse = (club: Doc<'clubs'>) => {
    const promise = join({ clubId: club._id, clubSlug: club.slug }).finally(
      () => {
        router.push(`/clubhouse/${club.slug}`);
      }
    );
  };

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
                key={club._id}
                variant='ghost'
                onClick={() => handleJoinClubhouse(club)}
                className='w-full items-center justify-start font-normal'
              >
                {club.name}
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
