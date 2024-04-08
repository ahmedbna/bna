'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bookmark, BookmarkCheck, MessageCircle, Send } from 'lucide-react';
import { Doc } from '@/convex/_generated/dataModel';
import Gradient from '../gradient';
import { formatTimeAgo } from '@/lib/formatTimeAgo';
import { SignInButton, useUser } from '@clerk/clerk-react';
import { Block } from '@blocknote/core';
import { useConvexAuth, useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { SharePost } from './share-post';
import { Spinner } from '../spinner';
import { PostFollow } from './post-follow';

type Props = {
  post: Doc<'posts'>;
};

export const PostCardAuth = ({ post }: Props) => {
  const postlikes = useQuery(api.likes.postlikes, { postId: post._id });
  const postSaves = useQuery(api.saves.postSaves, { postId: post._id });
  const commentsCount = useQuery(api.comments.commentsCount, {
    postId: post._id,
  });

  const content = JSON.parse(post.content || '[]');
  const excerpt = content.filter(
    (block: Block) => block.type === 'paragraph' && block.content?.length
  )[0]?.content?.[0]?.text;

  return (
    <SignInButton mode='modal' afterSignInUrl={`/post/${post._id}`}>
      <Card className='w-[350px] flex flex-col justify-between cursor-pointer'>
        <div>
          <CardHeader className='p-4 pb-0'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage
                    src={post?.userInfo?.pictureUrl}
                    alt={post?.userInfo?.name}
                  />
                  <AvatarFallback>
                    {post?.userInfo?.name?.charAt(0)}
                    {post?.userInfo?.name?.split(' ')?.pop()?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className='ml-2'>
                  <p className='text-sm font-medium leading-none'>
                    {post?.userInfo?.name}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    {formatTimeAgo(post._creationTime)}
                  </p>
                </div>
              </div>

              <Button
                disabled
                size='sm'
                variant='outline'
                className='ml-auto font-medium'
              >
                Follow
              </Button>
            </div>
          </CardHeader>

          <div>
            <CardContent className='p-4'>
              <div className='mb-4'>
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    width={500}
                    height={500}
                    alt='Picture of the author'
                    className='rounded-lg max-h-[210px] shadow-sm'
                  />
                ) : (
                  <Gradient
                    color1={post.color1}
                    color2={post.color2}
                    height={200}
                    className='rounded-lg shadow-sm'
                  />
                )}
              </div>

              <CardTitle className='text-lg font-bold tracking-tight'>
                {post.title}
              </CardTitle>

              <CardDescription className='mt-2'>
                {excerpt !== undefined ? excerpt : ''}
              </CardDescription>
            </CardContent>
          </div>
        </div>

        <CardFooter className='flex justify-between p-4 '>
          <div className='flex items-center gap-1'>
            <Button
              size='sm'
              disabled
              variant='outline'
              className='rounded-lg gap-1 flex items-center'
            >
              <p className='text-base grayscale'>
                <Image src='/ignite.png' height='14' width='14' alt='Ignite' />
              </p>
              <p>{postlikes?.length ? postlikes.length.toString() : '0'}</p>
            </Button>

            <Button
              size='sm'
              disabled
              variant='outline'
              className='rounded-lg gap-1'
            >
              <MessageCircle className='w-5 h-5' />
              <p>
                {commentsCount?.length ? commentsCount.length.toString() : '0'}
              </p>
            </Button>

            <Button
              size='sm'
              disabled
              variant='outline'
              className='rounded-lg gap-1'
            >
              <Bookmark className='grayscale w-5 h-5' />

              <p>{postSaves?.length ? postSaves.length.toString() : '0'}</p>
            </Button>
          </div>
          <SharePost postId={post._id} />
        </CardFooter>
      </Card>
    </SignInButton>
  );
};
