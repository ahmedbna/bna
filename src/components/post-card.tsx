import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { Bookmark, MessageCircle, Send } from 'lucide-react';
import Link from 'next/link';

type Props = {
  post: any;
};

export function PostCard({ post }: Props) {
  return (
    <Card className='w-[350px]'>
      <Link href={`/post/${post._id}`}>
        <CardHeader>
          <Image
            src='/img.jpg'
            width={500}
            height={500}
            alt='Picture of the author'
            className='rounded-lg'
          />
        </CardHeader>
        <CardContent>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>
            {'Deploy your new project in one-click.'}
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter className='flex justify-between'>
        <div className='flex items-center gap-1'>
          <Button variant='outline' className='rounded-full gap-1'>
            <p>{'🔥'}</p>
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
        </div>
        <Button variant='outline' className='rounded-full'>
          <Send className='w-5 h-5' />
        </Button>
      </CardFooter>
    </Card>
  );
}
