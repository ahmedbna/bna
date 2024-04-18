'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useConvexAuth, useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import EmptyPage from '@/components/empty-page';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { SendImage } from '@/components/modals/send-image';
import { Comments } from '@/components/comments/comments';
import { Doc } from '@/convex/_generated/dataModel';
import { getReplies } from '@/lib/getReplies';
import { MessageCircle } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const FormSchema = z.object({
  content: z.string().min(1, {
    message: 'content must be at least 1 characters.',
  }),
});

type Props = {
  size?: 'sm' | 'default' | 'lg' | 'icon' | null;
  post: Doc<'posts'>;
};

export const PostComments = ({ size = 'sm', post }: Props) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const postId = post._id;

  const [parentComment, setParentComment] = useState<
    Doc<'comments'> | undefined
  >(undefined);

  const postComments = useQuery(api.comments.postComments, { postId });
  const commentsCount = useQuery(api.comments.commentsCount, { postId });
  const discussion = postComments ? getReplies(postComments) : [];

  const comment = useMutation(api.comments.comment);
  const reply = useMutation(api.comments.reply);

  const { isLoading, isAuthenticated } = useConvexAuth();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (parentComment) {
      await reply({
        postId: postId,
        content: data.content,
        contentType: 'text',
        parentId: parentComment._id,
      });
    } else {
      await comment({
        postId: postId,
        content: data.content,
        contentType: 'text',
      });
    }

    form.setValue('content', '');
    setParentComment(undefined);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={size}
          variant='outline'
          disabled={!isAuthenticated}
          className='rounded-lg gap-1'
        >
          <MessageCircle className='w-5 h-5' />
          <p>{commentsCount?.length ? commentsCount.length.toString() : '0'}</p>
        </Button>
      </SheetTrigger>
      <SheetContent
        side={isDesktop ? 'right' : 'bottom'}
        className='h-full flex flex-col'
      >
        <SheetHeader>
          <SheetTitle>{post.title}</SheetTitle>
          {/* <SheetDescription>Comments</SheetDescription> */}
        </SheetHeader>

        <div className='flex-1 overflow-y-auto '>
          {discussion.length ? (
            <Comments
              isPost
              comments={discussion}
              setParentComment={setParentComment}
            />
          ) : (
            <EmptyPage title='Start Discussion' description=''>
              Write the first comment
            </EmptyPage>
          )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='pb-4 w-full'>
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem className='flex-grow'>
                  <FormMessage />
                  {parentComment ? (
                    <div className='flex items-center gap-2'>
                      <FormDescription className='text-green-600'>
                        Reply to {parentComment?.userInfo?.name}
                      </FormDescription>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => setParentComment(undefined)}
                      >
                        Clear
                      </Button>
                    </div>
                  ) : null}

                  <FormControl>
                    <Textarea
                      placeholder='Write your comment here'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className='w-full flex items-center gap-2 mt-4'>
              <Button className='flex-1' type='submit'>
                Comment
              </Button>
              <SendImage
                postId={postId}
                parentComment={parentComment}
                setParentComment={setParentComment}
              />
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
