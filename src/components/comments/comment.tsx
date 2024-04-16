'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { formatTimeAgo } from '@/lib/formatTimeAgo';
import { useUser } from '@clerk/clerk-react';
import { Doc } from '@/convex/_generated/dataModel';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Props = {
  isReply?: boolean;
  comment: Doc<'clubhouses'>;
  setParentComment: React.Dispatch<
    React.SetStateAction<Doc<'clubhouses'> | undefined>
  >;
};

export const Comment = ({
  isReply = false,
  comment,
  setParentComment,
}: Props) => {
  const { user } = useUser();

  return (
    <div
      key={comment._id}
      className='w-full p-2 rounded-lg flex items-start justify-start mb-4'
    >
      <Link
        href={`${
          comment.userId === user?.id ? '/me' : `/profile/${comment.userId}`
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
        <div className='w-full flex items-start gap-2'>
          <Link
            href={`${
              comment.userId === user?.id ? '/me' : `/profile/${comment.userId}`
            }`}
          >
            <p className='text-sm font-semibold leading-none'>
              {comment?.userInfo?.name}
            </p>
          </Link>
          <p className='text-xs text-muted-foreground'>
            {formatTimeAgo(comment._creationTime)}
          </p>
          {!isReply ? (
            <Button
              size='sm'
              variant='link'
              onClick={() => setParentComment(comment)}
              className='p-0 h-4'
            >
              Reply
            </Button>
          ) : null}
        </div>
        <div className='mt-2'>
          {comment.contentType === 'text' ? (
            <p className='text-sm leading-none'>{comment?.content}</p>
          ) : comment.contentType === 'image' ? (
            <Image
              src={comment.content}
              width={300}
              height={300}
              alt='image'
              className='rounded-lg shadow-sm'
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};