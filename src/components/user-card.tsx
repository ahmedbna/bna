import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@clerk/clerk-react';
import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { Button } from './ui/button';

type Props = {
  userInfo: any;
};

export const UserCard = ({ userInfo }: Props) => {
  const { user } = useUser();

  const follow = useMutation(api.follows.follow);
  const isFollow = useQuery(api.follows.isFollow, {
    followerId: userInfo.userId,
  });

  const handleFollow = async () => {
    await follow({
      followerId: userInfo.userId,
    });
  };

  return (
    <div className='flex items-center justify-start gap-4'>
      <Link
        href={`${
          userInfo.userId === user?.id ? '/me' : `/profile/${userInfo.userId}`
        }`}
        className='flex items-end flex-grow'
      >
        <Avatar className='h-10 w-10 rounded-lg'>
          <AvatarImage src={userInfo?.pictureUrl} alt={userInfo?.name} />
          <AvatarFallback>
            {userInfo?.name?.charAt(0)}
            {userInfo?.name?.split(' ')?.pop()?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className='ml-2'>
          <p className='text-xs text-muted-foreground'>{userInfo?.heading}</p>
          <p className='text-sm font-medium leading-none'>{userInfo?.name}</p>
        </div>
      </Link>
      {userInfo.userId !== user?.id ? (
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
  );
};
