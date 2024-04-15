'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'convex/react';
import { PostCard } from '@/components/post';
import { api } from '@/convex/_generated/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FollowersModal } from '@/components/followers-modal';
import { Spinner } from '@/components/spinner';
import EmptyPage from '@/components/empty-page';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { formatTimeAgo } from '@/lib/formatTimeAgo';
import { SendImage } from '@/components/modals/send-image';
import { Comments } from '@/components/comment';

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

  const club = useQuery(api.clubs.get, { slug: clubSlug });
  const clubComments = useQuery(api.clubhouses.clubComments, { clubSlug });
  const comment = useMutation(api.clubhouses.create);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await comment({
      clubSlug: clubSlug,
      content: data.content,
      contentType: 'text',
    });
    form.setValue('content', '');
  };

  return (
    <div className='h-full flex flex-col gap-2'>
      <div className='flex items-center bg-muted/50 pt-14 pb-4 px-8'>
        <p className='font-bold text-4xl'>{`${club?.name} Clubhouse`}</p>
      </div>
      <div className='flex-1 overflow-y-auto px-8 '>
        {clubComments ? <Comments comments={clubComments} /> : null}
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
            <SendImage clubSlug={clubSlug} />
          </div>
        </form>
      </Form>
    </div>
  );
}
