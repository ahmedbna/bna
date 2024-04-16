'use client';

import { formatTimeAgo } from '@/lib/formatTimeAgo';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useUser } from '@clerk/clerk-react';
import { Doc } from '@/convex/_generated/dataModel';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Comment } from './comment';

type Props = {
  comments: Array<Doc<'clubhouses'>>;
  setParentComment: React.Dispatch<
    React.SetStateAction<Doc<'clubhouses'> | undefined>
  >;
};

export const Comments = ({ comments, setParentComment }: Props) => {
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
            <div>
              <Comment
                key={comment._id}
                comment={comment}
                setParentComment={setParentComment}
              />

              {/* @ts-ignore */}
              {comment.replies ? (
                <div className='ml-6 pl-8 border-l-2 border-gray-300'>
                  {/* @ts-ignore */}
                  {comment.replies?.map((reply: Doc<'clubhouses'>) => (
                    <Comment
                      isReply
                      key={reply._id}
                      comment={reply}
                      setParentComment={setParentComment}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          ))
        : null}
      <div ref={chatEndRef} />
    </div>
  );
};
