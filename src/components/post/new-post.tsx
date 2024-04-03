'use client';

import { Button } from '@/components/ui/button';
import { useConvexAuth, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Spinner } from '../spinner';
import { SignInButton } from '@clerk/clerk-react';

export const NewPost = () => {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useConvexAuth();

  if (isLoading) {
    return (
      <div className='h-full flex items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  const create = useMutation(api.posts.create);
  const [loading, setLoading] = useState(false);

  const handleCreateNewPost = () => {
    setLoading(true);

    const response = create({ title: 'Click to Edit Title...' });

    toast.promise(response, {
      loading: 'Creating post...',
      success: 'Post created!',
      error: 'Something went wrong',
    });

    response
      .then((postId) => {
        if (postId) router.push(`me/draft/${postId}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {!isLoading && !isAuthenticated ? (
        <SignInButton mode='modal'>
          <Button>New Post</Button>
        </SignInButton>
      ) : (
        <Button onClick={handleCreateNewPost}>
          {loading ? <Spinner /> : 'New Post'}
        </Button>
      )}
    </>
  );
};
