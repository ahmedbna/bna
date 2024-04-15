'use client';

import { useMutation, useQuery } from 'convex/react';
import { PostCard } from '@/components/post';
import { api } from '@/convex/_generated/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FollowersModal } from '@/components/followers-modal';
import { Spinner } from '@/components/spinner';
import EmptyPage from '@/components/empty-page';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Props = {
  params: {
    slug: string;
  };
};

export default function Profile({ params }: Props) {
  const clubSlug = params.slug;
  const { user } = useUser();

  const club = useQuery(api.clubs.get, { slug: clubSlug });

  return (
    <div className='h-full flex flex-col gap-8 py-14 px-8'>
      <div className='flex items-center gap-4'>
        <p className='font-bold text-4xl'>{club?.name}</p>
        <Button asChild variant='outline'>
          <Link href={`/clubhouse/${clubSlug}`}>Clubhouse</Link>
        </Button>
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
