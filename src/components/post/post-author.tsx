'use client';

import { Doc } from '@/convex/_generated/dataModel';
import { CardHeader } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { useUser } from '@clerk/clerk-react';
import {
  Bookmark,
  BookmarkCheck,
  Ellipsis,
  MessageCircle,
  MessageSquareShare,
  Send,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { formatTimeAgo } from '@/lib/formatTimeAgo';
import { useConvexAuth, useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
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
import { SharePost } from './share-post';
import { CommentsDrawer } from './comments-drawer';
import Image from 'next/image';

interface Props {
  post: Doc<'posts'>;
}

export default function PostAuthor({ post }: Props) {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const update = useMutation(api.posts.update);
  const deletePost = useMutation(api.posts.deletePost);

  const likePost = useMutation(api.likes.like);
  const savePost = useMutation(api.saves.save);
  const follow = useMutation(api.follows.follow);

  const postlikes = useQuery(api.likes.postlikes, { postId: post._id });
  const postSaves = useQuery(api.saves.postSaves, { postId: post._id });
  const isFollow = useQuery(api.follows.isFollow, { followerId: post.userId });

  const isLikedByYou =
    postlikes && postlikes.find((like) => like.userId === user?.id)!;

  const isSavedByYou =
    postSaves && postSaves.find((save) => save.userId === user?.id)!;

  const { isLoading, isAuthenticated } = useConvexAuth();

  const handleFollow = async () => {
    await follow({
      followerId: post.userId,
    });
  };
  const handleLikePost = async () => {
    await likePost({
      postId: post._id,
    });
  };
  const handleSavePost = async () => {
    await savePost({
      postId: post._id,
    });
  };

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
    <div className='flex flex-col md:flex-row md:items-end justify-between gap-2'>
      <div className='flex items-center justify-start gap-4'>
        <Link
          href={`${
            post.userId === user?.id ? '/me' : `/profile/${post.userId}`
          }`}
          className='flex items-end'
        >
          <Avatar className='h-10 w-10 rounded-lg'>
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
        {post.userId !== user?.id ? (
          <Button
            size='sm'
            variant='ghost'
            onClick={handleFollow}
            className='ml-auto font-medium'
          >
            {isFollow ? 'Following' : 'Follow'}
          </Button>
        ) : null}
      </div>

      <div className='flex items-center gap-1'>
        {post.isPublished ? (
          <div className='flex items-center gap-1'>
            <Button
              variant='outline'
              onClick={handleLikePost}
              disabled={!isAuthenticated}
              className='rounded-lg gap-1 flex items-center'
            >
              <p className={`text-base ${isLikedByYou ? '' : 'grayscale'}`}>
                <Image src='/ignite.png' height='14' width='14' alt='Ignite' />
              </p>
              <p>{postlikes?.length ? postlikes.length.toString() : '0'}</p>
            </Button>
            <CommentsDrawer post={post} size='default' />
            <Button
              variant='outline'
              onClick={handleSavePost}
              disabled={!isAuthenticated || !post.isPublished}
              className='rounded-lg gap-1'
            >
              {isSavedByYou ? (
                <BookmarkCheck className='w-5 h-5 text-green-500' />
              ) : (
                <Bookmark
                  className={`${
                    !isAuthenticated || !post.isPublished
                      ? 'grayscale'
                      : 'grayscale-0'
                  } w-5 h-5`}
                />
              )}

              <p>{postSaves?.length ? postSaves.length.toString() : '0'}</p>
            </Button>
            <SharePost postId={post._id} size='default' />
          </div>
        ) : null}

        {user?.id === post.userId && post.isPublished ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant='outline' className='rounded-lg'>
                <Ellipsis className='h-4 w-4' />
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
            <div className='flex items-center gap-1'>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size='sm'
                    variant='destructive'
                    className='rounded-lg'
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

              <Button asChild variant='outline' className='rounded-lg'>
                <Link href='/me'>Your Drafts</Link>
              </Button>

              <Button
                variant='outline'
                className='rounded-lg'
                onClick={handlePublishPost}
              >
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
