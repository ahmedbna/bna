'use client';

import { useMutation, useQuery } from 'convex/react';
import { Spinner } from '@/components/spinner';
import PostHeader from '@/components/post/post-header';
import { api } from '../../../../../../../convex/_generated/api';
import { Doc, Id } from '../../../../../../../convex/_generated/dataModel';
import { useUser } from '@clerk/clerk-react';
import { redirect, useRouter } from 'next/navigation';
import { Block } from '@blocknote/core';
import { initialContent } from '@/lib/initial-content';
import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import PostAuthor from '@/components/post/post-author';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Props {
  params: {
    id: Id<'posts'>;
  };
}

export default function Draft({ params }: Props) {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const Editor = useMemo(
    () => dynamic(() => import('@/components/editor'), { ssr: false }),
    []
  );

  const update = useMutation(api.posts.update);
  const post = useQuery(api.posts.getMyPublishById, {
    postId: params.id,
  });

  if (post === undefined) {
    return (
      <div className='h-full flex items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }
  if (post === null) {
    return <div>Not found</div>;
  }

  if (post.userId !== user?.id) {
    return redirect('/');
  }

  const handleDraftPost = () => {
    setLoading(true);

    const promise = update({
      id: params.id,
      isPublished: false,
    });

    toast.promise(promise, {
      loading: 'Drafting post...',
      success: 'Post Drafted!',
      error: 'Something went wrong',
    });

    promise
      .then((postId) => {
        if (postId) router.push(`/me/post/draft/${postId}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <PostAuthor isDraft={true} post={post} />

      <div className='dark:bg-[#1f1f1f] min-h-full flex flex-col gap-4 relative'>
        <PostHeader isDraft={true} post={post} />
        <Editor initialContent={post.content || initialContent} />

        <div className='w-full flex items-center  p-6'>
          <Button
            className='w-full'
            size='lg'
            variant='default'
            disabled={loading}
            onClick={handleDraftPost}
          >
            {loading ? <Spinner /> : 'Draft'}
          </Button>
        </div>
      </div>
    </div>
  );
}
