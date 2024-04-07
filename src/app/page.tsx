'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { PostCard } from '@/components/post/post-card';

export default function Home() {
  const posts = useQuery(api.posts.get);

  return (
    <div className='h-full flex flex-col gap-8 py-14 px-8'>
      <p className='font-bold text-4xl'>For you</p>

      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-48'>
        {posts?.map((post) => <PostCard key={post._id} post={post} />)}
      </div>
    </div>
  );
}
