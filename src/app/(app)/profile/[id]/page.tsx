'use client';

import { useMutation, useQuery } from 'convex/react';
import { PostCard } from '@/components/post';
import { api } from '@/convex/_generated/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FollowersModal } from '@/components/modals/followers-modal';
import { Spinner } from '@/components/spinner';
import EmptyPage from '@/components/empty-page';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';

type Props = {
  params: {
    id: string;
  };
};

export default function Profile({ params }: Props) {
  const userId = params.id;
  const { user: userAuth } = useUser();

  const posts = useQuery(api.posts.getPostsByUser, { userId });
  const followers = useQuery(api.follows.followers, { userId });
  const followings = useQuery(api.follows.followings, { userId });
  const follow = useMutation(api.follows.follow);
  const isFollow = useQuery(api.follows.isFollow, {
    followerId: userId,
  });
  const user = useQuery(api.users.get, { userId });

  const handleFollow = async () => {
    await follow({
      followerId: userId,
    });
  };

  const publishedPosts = posts?.filter((post) => post.isPublished);

  if (user === undefined) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (user === null) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <div>Not found</div>
      </div>
    );
  }

  return (
    <div className='h-full flex flex-col gap-14 py-14 px-8'>
      <div>
        <div className='flex items-end justify-between'>
          <div className='flex items-end'>
            <Avatar className='h-24 w-24 rounded-2xl'>
              <AvatarImage src={user?.pictureUrl} alt={user?.name || ''} />
              <AvatarFallback>
                {user?.name?.charAt(0)}
                {user?.name?.split(' ')?.pop()?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className='ml-4'>
              {user?.heading ? (
                <p className='text-md text-muted-foreground'>{user.heading}</p>
              ) : null}
              <div className='flex items-center justify-start gap-1'>
                <p className='text-2xl font-bold leading-none'>{user?.name}</p>
                {userId !== userAuth?.id ? (
                  <Button
                    size='sm'
                    variant='ghost'
                    onClick={handleFollow}
                    className='ml-auto font-medium'
                  >
                    {isFollow ? 'Following' : 'Follow'}
                  </Button>
                ) : null}
              </div>
            </div>
          </div>

          <div className='flex items-center gap-8'>
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
        {user?.bio ? (
          <p className='text-md text-muted-foreground mt-4'>{user.bio}</p>
        ) : null}
      </div>

      {publishedPosts?.length ? (
        <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-48'>
          {publishedPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <EmptyPage
          title='No published posts yet'
          description='Follow to read their posts when they start publishing.'
        />
      )}
    </div>
  );
}
