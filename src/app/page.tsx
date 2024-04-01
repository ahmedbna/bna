'use client';

import { NewPost } from '@/components/new-post';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { PostCard } from '@/components/post-card';

export default function Home() {
  const posts = useQuery(api.posts.get);

  console.log(posts);

  return (
    <div className='h-full flex flex-col items-center gap-8'>
      <NewPost />
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
