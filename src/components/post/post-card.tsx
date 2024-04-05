import * as React from 'react';
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
import { Bookmark, MessageCircle, Send } from 'lucide-react';
import { Doc } from '../../../convex/_generated/dataModel';
import Gradient from '../gradient';
import { formatTimeAgo } from '@/lib/formatTimeAgo';
import { useUser } from '@clerk/clerk-react';

type Props = {
  post: Doc<'posts'>;
};

export const PostCard = ({ post }: Props) => {
  const { user } = useUser();
  const excerpt = post.content?.filter(
    (block) => block.type === 'paragraph' && block.content?.length
  )[0]?.content?.[0]?.text;

  return (
    <Card className='w-[350px] flex flex-col justify-between'>
      <div>
        <CardHeader className='p-4 pb-0'>
          <div className='flex items-center justify-between'>
            <Link
              href={`${
                post.userId === user?.id ? `/me` : `/profile/${post.userId}`
              }`}
              className='flex items-center'
            >
              <Avatar className='h-8 w-8'>
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
                <p className='text-xs text-muted-foreground'>
                  {formatTimeAgo(post._creationTime)}
                </p>
              </div>
            </Link>
            <Button variant='outline' size='sm' className='ml-auto font-medium'>
              Follow
            </Button>
          </div>
        </CardHeader>

        <Link
          href={`${
            post.isPublished === false && post.userId === user?.id
              ? `/me/draft/${post._id}`
              : `/post/${post._id}`
          }`}
        >
          <CardContent className='p-4'>
            <div className='mb-4'>
              {post.imageUrl ? (
                <Image
                  src={post.imageUrl}
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
        </Link>
      </div>

      <CardFooter className='flex justify-between p-4 '>
        <div className='flex items-center gap-1'>
          <Button variant='outline' size='sm' className='rounded-full gap-1'>
            <p className=' text-gray-400 '>{'🔥'}</p>
            <p>22</p>
          </Button>
          <Button variant='outline' size='sm' className='rounded-full gap-1'>
            <MessageCircle className='w-5 h-5' />
            <p>8</p>
          </Button>
          <Button variant='outline' size='sm' className='rounded-full gap-1'>
            <Bookmark className='w-5 h-5' />
            <p>96</p>
          </Button>
        </div>
        <Button variant='outline' size='sm' className='rounded-full'>
          <Send className='w-5 h-5' />
        </Button>
      </CardFooter>
    </Card>
  );
};
