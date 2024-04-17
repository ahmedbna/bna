'use client';

import { Doc } from '@/convex/_generated/dataModel';
import { useEffect, useRef } from 'react';
import { Comment } from './comment';
import { Separator } from '../ui/separator';

type Props = {
  isPost?: boolean;
  comments: Array<Doc<'clubhouses'> & Doc<'comments'>>;
  setParentComment: any;
};

export const Comments = ({
  isPost = false,
  comments,
  setParentComment,
}: Props) => {
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
                isPost={isPost}
                key={comment._id}
                comment={comment}
                setParentComment={setParentComment}
              />

              {/* @ts-ignore */}
              {comment.replies.length ? (
                <div className='ml-6 pl-8 mb-8'>
                  {/* <div className='ml-6 pl-8 border-l border-zinc-400'> */}
                  {/* @ts-ignore */}
                  {comment.replies?.map((reply: Doc<'clubhouses'>) => (
                    <Comment
                      isReply
                      isPost={isPost}
                      key={reply._id}
                      comment={reply}
                      setParentComment={setParentComment}
                    />
                  ))}
                </div>
              ) : null}

              <Separator />
            </div>
          ))
        : null}
      <div ref={chatEndRef} />
    </div>
  );
};
