'use client';

import { useMutation, useQuery } from 'convex/react';
import { Spinner } from '@/components/spinner';
import PostHeader from '@/components/post/post-header';
import { api } from '../../../../../../convex/_generated/api';
import { Doc, Id } from '../../../../../../convex/_generated/dataModel';
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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const Editor = useMemo(
    () => dynamic(() => import('@/components/editor'), { ssr: false }),
    []
  );

  const update = useMutation(api.posts.update);

  const post = useQuery(api.posts.getMyDraftById, {
    postId: params.id,
  });

  const handleChangeContent = (content: Array<Block>) => {
    update({
      id: params.id,
      content,
    });
  };

  if (post === undefined) {
    return (
      <div className='h-full flex items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (post === null) {
    return (
      <div className='h-full flex items-center justify-center'>
        <div>Not found</div>
      </div>
    );
  }

  if (post.userId !== user?.id) {
    return redirect('/');
  }

  const handlePublishPost = () => {
    setLoading(true);

    const promise = update({
      id: params.id,
      isPublished: true,
    });

    toast.promise(promise, {
      loading: 'Publishing post...',
      success: 'Post Published!',
      error: 'Something went wrong',
    });

    promise
      .then((postId) => {
        if (postId) router.push(`/post/${postId}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeletePost = () => {};

  return (
    <div>
      <PostAuthor post={post} />

      <div className='dark:bg-[#1f1f1f] min-h-full flex flex-col gap-4 relative mx-[-16px] lg:mx-[-32px]'>
        <PostHeader isDraft={true} post={post} />
        <Editor
          initialContent={post.content || initialContent}
          handleChangeContent={handleChangeContent}
        />

        <div className='w-full flex items-center gap-4 p-6 pt-24'>
          <Button
            className='w-full'
            size='lg'
            variant='destructive'
            disabled={loading}
            onClick={handleDeletePost}
          >
            {loading ? <Spinner /> : 'Delete'}
          </Button>

          <Button
            className='w-full'
            size='lg'
            variant='default'
            disabled={loading}
            onClick={handlePublishPost}
          >
            {loading ? <Spinner /> : 'Publish'}
          </Button>
        </div>
      </div>
    </div>
  );
}
