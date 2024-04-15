'use client';

import { formatTimeAgo } from '@/lib/formatTimeAgo';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useUser } from '@clerk/clerk-react';
import { Doc } from '@/convex/_generated/dataModel';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

type Props = {
  comments: Array<Doc<'clubhouses'>>;
};

export const Comments = ({ comments }: Props) => {
  const { user } = useUser();

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  return (
    <div className='rounded-lg'>
      {comments?.length
        ? comments.map((comment) => (
            <div
              key={comment._id}
              className='w-full bg-zinc-800 p-2 rounded-lg flex items-start justify-start mb-2'
            >
              <Link
                href={`${
                  comment.userId === user?.id
                    ? '/me'
                    : `/profile/${comment.userId}`
                }`}
              >
                <Avatar className='h-9 w-9 rounded-lg'>
                  <AvatarImage
                    src={comment?.userInfo?.pictureUrl}
                    alt={comment?.userInfo?.name}
                  />
                  <AvatarFallback>
                    {comment?.userInfo?.name?.charAt(0)}
                    {comment?.userInfo?.name?.split(' ')?.pop()?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Link>

              <div className='ml-2 flex-grow'>
                <div className='w-full flex items-start justify-between flex-grow'>
                  <Link
                    href={`${
                      comment.userId === user?.id
                        ? '/me'
                        : `/profile/${comment.userId}`
                    }`}
                  >
                    <p className='text-sm font-semibold leading-none'>
                      {comment?.userInfo?.name}
                    </p>
                  </Link>
                  <p className='text-xs text-muted-foreground'>
                    {formatTimeAgo(comment._creationTime)}
                  </p>
                </div>

                {comment.contentType === 'text' ? (
                  <p className='text-sm leading-none mt-1'>
                    {comment?.content}
                  </p>
                ) : comment.contentType === 'image' ? (
                  <Image
                    src={comment.content}
                    width={200}
                    height={200}
                    alt='image'
                    className='rounded-lg shadow-sm'
                  />
                ) : null}
              </div>
            </div>
          ))
        : null}
      <div ref={chatEndRef} />
    </div>
  );
};
