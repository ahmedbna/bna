'use client';

import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import { useConvexAuth, useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

type Props = {
  userId: string;
};

export const PostFollow = ({ userId }: Props) => {
  const { user } = useUser();

  const follow = useMutation(api.follows.follow);
  const isFollow = useQuery(api.follows.isFollow, { followerId: userId });

  const handleFollow = async () => {
    await follow({
      followerId: userId,
    });
  };

  return (
    <>
      {userId !== user?.id ? (
        <Button
          size='sm'
          variant='outline'
          onClick={handleFollow}
          className='ml-auto font-medium'
        >
          {isFollow ? 'Following' : 'Follow'}
        </Button>
      ) : null}
    </>
  );
};
