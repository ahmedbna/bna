'use client';

import { useQuery } from 'convex/react';
import { PostCard } from '@/components/post';
import { api } from '@/convex/_generated/api';
import { Spinner } from '@/components/spinner';
import EmptyPage from '@/components/empty-page';

type Props = {
  params: {
    slug: string;
  };
};

export default function Club({ params }: Props) {
  const clubSlug = params.slug;

  const club = useQuery(api.clubs.get, { slug: clubSlug });
  const members = useQuery(api.clubguests.members, { clubSlug: clubSlug });

  if (club === undefined) {
    return (
      <div className='h-full flex items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (club === null) {
    return (
      <div className='h-full flex items-center justify-center'>
        <EmptyPage title='No Posts' description='Add clubs to posts'>
          No Posts
        </EmptyPage>
      </div>
    );
  }

  return (
    <div className='h-full flex flex-col gap-8 py-14 px-8'>
      <div>
        <div className='flex items-end gap-4'>
          <p className='font-bold text-4xl'>{club?.name}</p>
        </div>
        {/* <p className='text text-muted-foreground mt-2'>
          {`${members?.length} ${members?.length === 1 ? 'Member' : 'Members'}`}
        </p> */}
      </div>

      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-48'>
        {club?.publishedPosts.length
          ? club.publishedPosts.map((post) => (
              <PostCard key={post?._id!} post={post!} />
            ))
          : null}
      </div>
    </div>
  );
}
