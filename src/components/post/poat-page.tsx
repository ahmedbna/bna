'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { Spinner } from '@/components/spinner';
import { PostHeader } from '@/components/post/post-header';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useUser } from '@clerk/clerk-react';
import { redirect } from 'next/navigation';
import { initialContent } from '@/lib/initial-content';

interface Props {
  postId: Id<'posts'>;
  isDraft: boolean;
  editable: boolean;
}

export const PostPage = ({ postId, isDraft, editable }: Props) => {
  const { user } = useUser();

  const Editor = useMemo(
    () => dynamic(() => import('@/components/editor'), { ssr: false }),
    []
  );

  const update = useMutation(api.posts.update);
  const post = useQuery(api.posts.getPostById, {
    postId,
  });

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

  if (isDraft && post.userId !== user?.id) {
    return redirect('/');
  }

  const handleChangeContent = async (content: string) => {
    if (!editable && !isDraft && post.userId !== user?.id) return null;

    await update({
      id: postId,
      content,
    });
  };

  return (
    <div>
      {/* <PostAuthor post={post} /> */}

      <div className='dark:bg-[#1f1f1f] min-h-screen flex flex-col gap-4 relative'>
        <PostHeader isDraft={isDraft} post={post} />

        <Editor
          editable={editable}
          initialContent={post.content || JSON.stringify(initialContent)}
          handleChangeContent={handleChangeContent}
        />

        {/* <div className='fixed bottom-0 right-0 flex justify-center mr-2 mb-2'>
          <div className='w-full max-w-[800px]'>
            <Alert>
              <PostAuthor post={post} />
            </Alert>
          </div>
        </div> */}
      </div>
    </div>
  );
};
