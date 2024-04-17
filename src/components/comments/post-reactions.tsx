'use client';

import { useState } from 'react';
import { EmojiPicker } from '../emoji-picker';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { Button } from '../ui/button';

interface UserInfo {
  email: string;
  name: string;
  pictureUrl: string;
  userId: string;
}

interface Reaction {
  emoji: string;
  count: number;
  userInfos: UserInfo[];
}

type Props = {
  comment: Doc<'comments'>;
};

export const PostReactions = ({ comment }: Props) => {
  const [open, setOpen] = useState(false);
  const commentReactions = useQuery(api.commentreactions.commentReactions, {
    commentId: comment._id,
  });

  const react = useMutation(api.commentreactions.react);
  const handleEmojiSelect = async (emoji: string) => {
    await react({ commentId: comment._id, reaction: emoji });
    setOpen(false);
  };

  const reactions: Reaction[] | undefined =
    commentReactions &&
    commentReactions.reduce((acc: Reaction[], curr) => {
      const existingReaction = acc.find((item) => item.emoji === curr.reaction);
      if (existingReaction) {
        existingReaction.count++;
        // @ts-ignore
        existingReaction.userInfos.push(curr.userInfo);
      } else {
        acc.push({
          emoji: curr.reaction,
          count: 1,
          // @ts-ignore
          userInfos: [curr.userInfo],
        });
      }
      return acc;
    }, []);

  return (
    <div className='flex items-center gap-2 pt-2'>
      {reactions?.length
        ? reactions.map((reaction) => (
            <Button
              size='sm'
              variant='outline'
              className='rounded-lg gap-1 flex items-center'
            >
              <p className='text-base'>{reaction.emoji}</p>
              <p>{reaction.count}</p>
            </Button>
          ))
        : null}

      <EmojiPicker open={open} setOpen={setOpen} onChange={handleEmojiSelect} />
    </div>
  );
};
