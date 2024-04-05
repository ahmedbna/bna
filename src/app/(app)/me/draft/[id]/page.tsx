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
import { Alert } from '@/components/ui/alert';
import { LinkPreview } from '@/components/editor/link/link-preview';

interface Props {
  params: {
    id: Id<'posts'>;
  };
}

export default function Draft({ params }: Props) {
  const { user } = useUser();

  const Editor = useMemo(
    () => dynamic(() => import('@/components/editor'), { ssr: false }),
    []
  );

  const update = useMutation(api.posts.update);

  const post = useQuery(api.posts.getMyDraftById, {
    postId: params.id,
  });

  const handleChangeContent = (content: string) => {
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

  return (
    <div>
      {/* <PostAuthor post={post} /> */}

      <div className='dark:bg-[#1f1f1f] min-h-screen flex flex-col gap-4 relative'>
        <PostHeader isDraft={true} post={post} />

        <Editor
          initialContent={post.content || JSON.stringify(initialContent)}
          handleChangeContent={handleChangeContent}
        />

        <div className='fixed bottom-0 right-0 flex justify-center mr-2 mb-2'>
          <div className='w-full max-w-[800px]'>
            <Alert>
              <PostAuthor post={post} />
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
}
