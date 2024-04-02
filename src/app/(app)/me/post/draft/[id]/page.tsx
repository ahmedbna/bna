'use client';

import Image from 'next/image';
import { useQuery } from 'convex/react';
import { Spinner } from '@/components/spinner';
import { Editor } from '@/components/editor';
import PostHeader from '@/components/post/post-header';
import { api } from '../../../../../../../convex/_generated/api';
import { Id } from '../../../../../../../convex/_generated/dataModel';

interface Props {
  params: {
    id: Id<'posts'>;
  };
}

export default function Draft({ params }: Props) {
  const post = useQuery(api.posts.getDraftPost, {
    postId: params.id,
  });

  const handleChangeContent = (content: string) => {
    console.log(content);
  };

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

  return (
    <div className='pb-48 dark:bg-[#1f1f1f] min-h-full flex flex-col gap-8 rounded-xl '>
      <PostHeader isDraft={true} post={post} />
      <Editor handleChangeContent={handleChangeContent} />
    </div>
  );
}
