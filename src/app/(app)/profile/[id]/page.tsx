'use client';

import { SignOutButton, UserButton, useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PostCard } from '@/components/post';
import { useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Profile() {
  const { user } = useUser();

  const posts = useQuery(api.posts.getMyPosts);

  const publishedPosts = posts?.filter((post) => post.isPublished);
  const draftPosts = posts?.filter((post) => !post.isPublished);

  return (
    <div className='h-full flex flex-col gap-16 py-14 px-8'>
      {/* <SignOutButton>
        <Button>Logout</Button>
      </SignOutButton> */}

      {/* <UserButton afterSignOutUrl='/' /> */}

      <div className='flex items-end justify-between'>
        <div className='flex items-end'>
          <Avatar className='h-24 w-24 rounded-2xl'>
            <AvatarImage src={user?.imageUrl} alt={user?.fullName || ''} />
            <AvatarFallback>
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className='ml-4'>
            <p className='text-2xl font-bold leading-none'>{user?.fullName}</p>
            <p className='text-md text-muted-foreground'>
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>

        <div className='flex items-center gap-8'>
          <div className='flex flex-col items-center'>
            <p className='text-2xl font-bold leading-none'>4</p>
            <p className='text-md text-muted-foreground mt-2'>Posts</p>
          </div>
          <div className='flex flex-col items-center'>
            <p className='text-2xl font-bold leading-none'>220</p>
            <p className='text-md text-muted-foreground mt-2'>Followrs</p>
          </div>
          <div className='flex flex-col items-center'>
            <p className='text-2xl font-bold leading-none'>100</p>
            <p className='text-md text-muted-foreground mt-2'>Following</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue='published'>
        <TabsList className='mb-4'>
          <TabsTrigger value='published'>Published</TabsTrigger>
          <TabsTrigger value='draft'>Draft</TabsTrigger>
          <TabsTrigger value='saved' disabled>
            Saved
          </TabsTrigger>
        </TabsList>
        <TabsContent value='published'>
          <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-48'>
            {publishedPosts?.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value='draft'>
          <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-48'>
            {draftPosts?.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value='saved'>
          <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-48'>
            {draftPosts?.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
