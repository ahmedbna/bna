'use client';

import { Button } from '@/components/ui/button';
import { useConvexAuth, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Spinner } from '../spinner';
import { SignInButton } from '@clerk/clerk-react';
import { PencilLine } from 'lucide-react';

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

    const response = create();

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
          <Button variant='default' className='w-full'>
            {loading ? (
              <Spinner />
            ) : (
              <p className='flex items-center justify-center text-md font-bold tracking-tight'>
                New Post
                <PencilLine className='w-4 h-4 ml-2' />
              </p>
            )}
          </Button>
        </SignInButton>
      ) : (
        <Button
          variant='default'
          className='w-full'
          onClick={handleCreateNewPost}
        >
          {loading ? (
            <Spinner />
          ) : (
            <p className='flex items-center justify-center text-md font-bold tracking-tight'>
              New Post
              <PencilLine className='w-4 h-4 ml-2' />
            </p>
          )}
        </Button>
      )}
    </>
  );
};
