'use client';

import { Doc } from '../../../convex/_generated/dataModel';
import { CardHeader } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { useUser } from '@clerk/clerk-react';
import {
  Bookmark,
  Ellipsis,
  MessageCircle,
  MessageSquareShare,
  Send,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { formatTimeAgo } from '@/lib/formatTimeAgo';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Spinner } from '../spinner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Props {
  post: Doc<'posts'>;
}

export default function PostAuthor({ post }: Props) {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const update = useMutation(api.posts.update);
  const deletePost = useMutation(api.posts.deletePost);

  const handleDraftPost = () => {
    if (user?.id !== post.userId) return;

    setLoading(true);

    const promise = update({
      id: post._id,
      isPublished: false,
    });

    toast.promise(promise, {
      loading: 'Drafting post...',
      success: 'Post Drafted!',
      error: 'Something went wrong',
    });

    promise
      .then((postId) => {
        if (postId) router.push(`/me/draft/${postId}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePublishPost = () => {
    setLoading(true);

    const promise = update({
      id: post._id,
      isPublished: true,
    });

    toast.promise(promise, {
      loading: 'Publishing post...',
      success: 'Post Published!',
      error: 'Something went wrong',
    });

    promise
      .then((postId) => {
        if (postId) router.push(`/post/${postId}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeletePost = () => {
    setLoading(true);

    const promise = deletePost({
      id: post._id,
    })
      .then(() => {
        router.replace('/');
      })
      .finally(() => {
        setLoading(false);
      });

    toast.promise(promise, {
      loading: 'Deleting post...',
      success: 'Post is deleted!',
      error: 'Something went wrong',
    });
  };

  return (
    <div className='flex items-end justify-start gap-6'>
      <Link
        href={`${post.userId === user?.id ? '/me' : `/profile/${post.userId}`}`}
        className='flex items-end'
      >
        <Avatar className='h-9 w-9 rounded-lg'>
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
      </Link>

      <div className='flex items-center gap-1'>
        {post.isPublished ? (
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
        ) : null}

        {user?.id === post.userId && post.isPublished ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant='outline'
                className='rounded-full gap-1 w-9 h-9 p-0'
              >
                <Ellipsis className='w-5 h-5' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Manage Post</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDraftPost}>
                Draft Post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}

        {user?.id === post.userId && !post.isPublished ? (
          loading ? (
            <Spinner />
          ) : (
            <div className='flex items-center gap-2'>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant='destructive'
                    className='w-8 h-8 p-0 rounded-full'
                    size='sm'
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                  <DialogHeader>
                    <DialogTitle>Delet Post</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this post!
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter>
                    <Button variant='destructive' onClick={handleDeletePost}>
                      Delete Post
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button variant='outline' onClick={handlePublishPost}>
                Publish Post
                <MessageSquareShare className='ml-2 w-4 h-4' />
              </Button>
            </div>
          )
        ) : null}
      </div>

      {/* <Button variant='outline' size='sm' className='ml-auto font-medium'>
          Follow
        </Button> */}
    </div>
  );
}
