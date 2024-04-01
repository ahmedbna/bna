'use client';

import Editor from '@/components/editor';
import { useQuery } from 'convex/react';
import { api } from '../../../../../../../convex/_generated/api';
import { Id } from '../../../../../../../convex/_generated/dataModel';
import { Spinner } from '@/components/spinner';
import Image from 'next/image';

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
    return <Spinner />;
  }
  if (post === null) {
    return <div>Not found</div>;
  }

  return (
    <div className='dark:bg-[#1f1f1f] h-full min-h-16 mx-56 flex flex-col gap-8 rounded-xl'>
      <Image
        src='/img.jpg'
        width={500}
        height={500}
        alt='Picture of the author'
        className='rounded-lg'
      />
      <div className='px-[54px]'>
        <h1 className='text-5xl	font-bold text-[#cfcfcf]'>{post.title}</h1>
        <p className='text-[#cfcfcf]'>{post.excerpt}</p>
      </div>
      <Editor handleChangeContent={handleChangeContent} />
    </div>
  );
}
