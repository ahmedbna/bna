'use client';

import { Doc } from '../../../convex/_generated/dataModel';
import { CardHeader } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { useUser } from '@clerk/clerk-react';
import { Bookmark, MessageCircle, Send } from 'lucide-react';
import Link from 'next/link';
import { formatTimeAgo } from '@/lib/formatTimeAgo';

interface Props {
  post: Doc<'posts'>;
}

export default function PostAuthor({ post }: Props) {
  const { user } = useUser();

  return (
    <div className='sm:mx-4 md:mx-0 w-full mb-4'>
      <div className='flex items-center justify-between'>
        <Link
          href={`${post.userId === user?.id ? '/me' : `/user/${post.userId}`}`}
          className='flex items-center'
        >
          <Avatar className='h-9 w-9'>
            <AvatarImage
              src={post?.userInfo?.pictureUrl}
              alt={post?.userInfo?.name}
            />
            <AvatarFallback>
              {post?.userInfo?.name?.charAt(0)}
              {post?.userInfo?.name?.split(' ')?.pop()?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className='ml-4'>
            <p className='text-sm font-medium leading-none'>
              {post?.userInfo?.name}
            </p>
            <p className='text-sm text-muted-foreground'>
              {formatTimeAgo(post._creationTime)}
            </p>
          </div>
        </Link>
        <div className='flex items-center gap-1'>
          <Button variant='outline' className='rounded-full gap-1'>
            <p className=' text-gray-400 '>{'🔥'}</p>
            <p>22</p>
          </Button>
          <Button variant='outline' className='rounded-full gap-1'>
            <MessageCircle className='w-5 h-5' />
            <p>8</p>
          </Button>
          <Button variant='outline' className='rounded-full gap-1'>
            <Bookmark className='w-5 h-5' />
            <p>96</p>
          </Button>
          <Button variant='outline' className='rounded-full'>
            <Send className='w-5 h-5' />
          </Button>
        </div>
        {/* <Button variant='outline' size='sm' className='ml-auto font-medium'>
          Follow
        </Button> */}
      </div>
    </div>
  );
}
