'use client';

import { z } from 'zod';
import { Doc } from '../../../convex/_generated/dataModel';
import { api } from '../../../convex/_generated/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useConvexAuth, useMutation, useQuery } from 'convex/react';
import { MessageCircle } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { formatTimeAgo } from '@/lib/formatTimeAgo';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';
import { useUser } from '@clerk/clerk-react';

const FormSchema = z.object({
  content: z.string().min(3, {
    message: 'content must be at least 3 characters.',
  }),
});

type Props = {
  post: Doc<'posts'>;
};

export const Comments = ({ post }: Props) => {
  const { user } = useUser();
  const { isLoading, isAuthenticated } = useConvexAuth();
  const comment = useMutation(api.comments.comment);
  const commentsCount = useQuery(api.comments.commentsCount, {
    postId: post._id,
  });
  const postComments = [];
  // const postComments = useQuery(api.comments.postComments, {
  //   postId: post._id,
  // });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await comment({
      postId: post._id,
      content: data.content,
    });

    form.setValue('content', '');
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          size='sm'
          variant='outline'
          disabled={!isAuthenticated}
          className='rounded-lg gap-1'
        >
          <MessageCircle className='w-5 h-5' />
          <p>{commentsCount?.length ? commentsCount.length.toString() : '0'}</p>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='mx-auto w-full max-w-xl'>
          <DrawerHeader>
            <DrawerTitle>{post.title}</DrawerTitle>
          </DrawerHeader>

          {postComments?.length
            ? postComments.map((comment) => (
                <div className='bg-zinc-800 p-2 rounded-lg flex items-start justify-start mb-2 mx-4 '>
                  <Link
                    href={`${
                      comment.userId === user?.id
                        ? '/me'
                        : `/profile/${comment.userId}`
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

                  <div className='ml-2'>
                    <div className='flex items-start justify-between flex-grow'>
                      <Link
                        href={`${
                          comment.userId === user?.id
                            ? '/me'
                            : `/profile/${comment.userId}`
                        }`}
                      >
                        <p className='text-sm font-semibold leading-none mb-2'>
                          {comment?.userInfo?.name}
                        </p>
                      </Link>
                      <p className='text-xs text-muted-foreground '>
                        {formatTimeAgo(comment._creationTime)}
                      </p>
                    </div>

                    <p className='text-sm leading-none'>{comment?.content}</p>
                  </div>
                </div>
              ))
            : null}

          <DrawerFooter>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='w-full space-y-2'
              >
                <FormField
                  control={form.control}
                  name='content'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder='Write your comment here'
                          className='resize-none'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex items-center justify-end'>
                  <Button className='' type='submit'>
                    Comment
                  </Button>
                </div>
              </form>
            </Form>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
