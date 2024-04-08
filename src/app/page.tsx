'use client';

import { useConvexAuth, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { PostCard } from '@/components/post/post-card';
import { PostCardAuth } from '@/components/post/post-card-auth';
import { Spinner } from '@/components/spinner';

export default function Home() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const posts = useQuery(api.posts.get);

  if (posts === undefined) {
    return (
      <div className='h-full flex items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (posts === null) {
    return (
      <div className='h-full flex items-center justify-center'>
        <div>Not found</div>
      </div>
    );
  }

  return (
    <div className='h-full flex flex-col gap-8 py-14 px-8'>
      <p className='font-bold text-4xl'>For you</p>

      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-48'>
        {posts?.map((post) => (
          <>
            {!isLoading && !isAuthenticated ? (
              <PostCardAuth key={post._id} post={post} />
            ) : (
              <PostCard key={post._id} post={post} />
            )}
          </>
        ))}
      </div>
    </div>
  );
}
