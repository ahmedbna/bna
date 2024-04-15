'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useUser } from '@clerk/clerk-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PostCard } from '@/components/post';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import EmptyPage from '@/components/empty-page';
import { NewPost } from '@/components/post/new-post';
import { FollowersModal } from '@/components/followers-modal';
import { Settings } from '@/components/modals/settings';
import { Spinner } from '@/components/spinner';

export default function Account() {
  const { user } = useUser();

  const saves = useQuery(api.saves.saves);
  const posts = useQuery(api.posts.getPostsByUser, {});
  const followers = useQuery(api.follows.followers, {});
  const followings = useQuery(api.follows.followings, {});
  const you = useQuery(api.users.get, {});

  const publishedPosts = posts?.filter((post) => post.isPublished);
  const draftPosts = posts?.filter((post) => !post.isPublished);
  const savedPosts = saves?.filter((post) => post !== null);

  if (you === undefined) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (you === null) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <div>Not found</div>
      </div>
    );
  }

  return (
    <div className='h-full flex flex-col gap-14 py-14 px-8'>
      {/* <UserButton appearance={undefined} afterSignOutUrl='/' /> */}

      <div>
        <div className='flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-4'>
          <div className='flex items-end'>
            <Avatar className='h-24 w-24 rounded-2xl'>
              <AvatarImage src={user?.imageUrl} alt={user?.fullName || ''} />
              <AvatarFallback>
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className='ml-4'>
              {you?.heading ? (
                <p className='text-md text-muted-foreground'>{you.heading}</p>
              ) : null}
              <div className='flex items-center justify-start gap-1'>
                <p className='text-2xl font-bold leading-none'>
                  {user?.fullName}
                </p>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Settings heading={you?.heading} bio={you?.bio} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Settings</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>

          <div className='flex items-center justify-between md:justify-normal  gap-8'>
            <div className='flex flex-col items-center'>
              <p className='text-2xl font-bold leading-none'>
                {publishedPosts?.length
                  ? publishedPosts?.length.toString()
                  : '0'}
              </p>
              <p className='text-md text-muted-foreground mt-2'>Posts</p>
            </div>
            <FollowersModal title='Followers' follows={followers} />
            <FollowersModal title='Following' follows={followings} />
          </div>
        </div>

        {you?.bio ? (
          <p className='text-md text-muted-foreground mt-4'>{you.bio}</p>
        ) : null}
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
          {savedPosts?.length ? (
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-48'>
              {savedPosts.map((post) => (
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
