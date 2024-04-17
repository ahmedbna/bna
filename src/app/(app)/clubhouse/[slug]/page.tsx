'use client';

import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import EmptyPage from '@/components/empty-page';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
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

const FormSchema = z.object({
  content: z.string().min(1, {
    message: 'content must be at least 1 characters.',
  }),
});

type Props = {
  params: {
    slug: string;
  };
};

export default function Clubhouse({ params }: Props) {
  const clubSlug = params.slug;
  const { user } = useUser();

  const [parentComment, setParentComment] = useState<
    Doc<'clubhouses'> | undefined
  >(undefined);

  const club = useQuery(api.clubs.get, { slug: clubSlug });
  const members = useQuery(api.clubguests.members, { clubSlug: clubSlug });
  const clubComments = useQuery(api.clubhouses.clubComments, { clubSlug });

  const discussion = clubComments ? getReplies(clubComments) : [];

  const comment = useMutation(api.clubhouses.create);
  const reply = useMutation(api.clubhouses.reply);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (parentComment) {
      await reply({
        clubSlug: clubSlug,
        content: data.content,
        contentType: 'text',
        parentId: parentComment._id,
      });
    } else {
      await comment({
        clubSlug: clubSlug,
        content: data.content,
        contentType: 'text',
      });
    }

    form.setValue('content', '');
    setParentComment(undefined);
  };

  return (
    <div className='h-full flex flex-col gap-2'>
      <div className='flex items-center bg-muted/50 py-6 px-8'>
        <div>
          <p className='font-bold text-4xl'>{`${club?.name} Clubhouse`}</p>
          <p className='text text-muted-foreground mt-2'>
            {`${members?.length} ${members?.length === 1 ? 'Member' : 'Members'}`}
          </p>
        </div>
      </div>
      <div className='flex-1 overflow-y-auto px-8 '>
        {discussion.length ? (
          <Comments comments={discussion} setParentComment={setParentComment} />
        ) : (
          <EmptyPage
            title='Start Discussion'
            description='Write the first comment'
          >
            Be the first to start a discussion for this clubhouse
          </EmptyPage>
        )}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='px-8 pb-4 w-full flex items-end gap-4'
        >
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

          <div className='flex items-center gap-2'>
            <Button className='' type='submit'>
              Comment
            </Button>
            <SendImage
              clubSlug={clubSlug}
              parentComment={parentComment}
              setParentComment={setParentComment}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
