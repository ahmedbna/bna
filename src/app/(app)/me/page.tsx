'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { SignOutButton, useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PostCard } from '@/components/post';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import EmptyPage from '@/components/empty-page';
import { NewPost } from '@/components/post/new-post';
import { LogOut } from 'lucide-react';
import { FollowersModal } from '@/components/followers-modal';

export default function Account() {
  const { user } = useUser();

  const posts = useQuery(api.posts.getMyPosts);
  const saves = useQuery(api.saves.saves);
  const followers = useQuery(api.follows.followers, {});
  const followings = useQuery(api.follows.followings, {});

  const publishedPosts = posts?.filter((post) => post.isPublished);
  const draftPosts = posts?.filter((post) => !post.isPublished);

  return (
    <div className='h-full flex flex-col gap-16 py-14 px-8'>
      {/* <UserButton appearance={undefined} afterSignOutUrl='/' /> */}

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
            <div className='flex items-center justify-start gap-1'>
              <p className='text-2xl font-bold leading-none'>
                {user?.fullName}
              </p>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant='ghost' className='p-2'>
                      <SignOutButton>
                        <LogOut className='w-5 h-5 cursor-pointer' />
                      </SignOutButton>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Logout</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className='text-md text-muted-foreground'>
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>

        <div className='flex items-center gap-8'>
          <div className='flex flex-col items-center'>
            <p className='text-2xl font-bold leading-none'>
              {publishedPosts?.length ? publishedPosts?.length.toString() : '0'}
            </p>
            <p className='text-md text-muted-foreground mt-2'>Posts</p>
          </div>
          <FollowersModal title='Followers' follows={followers} />
          <FollowersModal title='Following' follows={followings} />
        </div>
      </div>

      <Tabs defaultValue='draft'>
        <TabsList className='mb-4'>
          <TabsTrigger value='published'>Published</TabsTrigger>
          <TabsTrigger value='draft'>Draft</TabsTrigger>
          <TabsTrigger value='saved'>Saved</TabsTrigger>
        </TabsList>
        <TabsContent value='published'>
          {publishedPosts?.length ? (
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-48'>
              {publishedPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <EmptyPage
              title='You have no published posts'
              description='Publish your post to the world form the draft tab.'
            />
          )}
        </TabsContent>
        <TabsContent value='draft'>
          {draftPosts?.length ? (
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-48'>
              {draftPosts?.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <EmptyPage
              title='You have no darfts'
              description='Write your first post now.'
            >
              <NewPost />
            </EmptyPage>
          )}
        </TabsContent>
        <TabsContent value='saved'>
          {saves?.length ? (
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-48'>
              {saves.map((post) => (
                <PostCard key={post?._id} post={post!} />
              ))}
            </div>
          ) : (
            <EmptyPage
              title='You have no saved posts'
              description='Save posts by clicking on bookmark button.'
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
