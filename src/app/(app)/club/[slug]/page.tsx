'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'convex/react';
import { PostCard } from '@/components/post';
import { api } from '@/convex/_generated/api';
import { Spinner } from '@/components/spinner';
import EmptyPage from '@/components/empty-page';
import { Button } from '@/components/ui/button';
import { Doc } from '@/convex/_generated/dataModel';
import { MessagesSquare } from 'lucide-react';

type Props = {
  params: {
    slug: string;
  };
};

export default function Club({ params }: Props) {
  const clubSlug = params.slug;
  const router = useRouter();

  const club = useQuery(api.clubs.get, { slug: clubSlug });
  const members = useQuery(api.clubguests.members, { clubSlug: clubSlug });
  const join = useMutation(api.clubhouseguests.join);

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

  const handleJoinClubhouse = (club: Doc<'clubs'>) => {
    const promise = join({ clubId: club._id, clubSlug: club.slug }).finally(
      () => {
        router.push(`/clubhouse/${club.slug}`);
      }
    );
  };

  return (
    <div className='h-full flex flex-col gap-8 py-14 px-8'>
      <div>
        <div className='flex items-end gap-4'>
          <p className='font-bold text-4xl'>{club?.name}</p>
          <Button
            size='lg'
            className='font-bold text-lg'
            onClick={() => handleJoinClubhouse(club)}
          >
            Clubhouse
            <MessagesSquare className='w-6 h-6 ml-2' />
          </Button>
        </div>
        <p className='text text-muted-foreground mt-2'>
          {`${members?.length} ${members?.length === 1 ? 'Member' : 'Members'}`}
        </p>
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
