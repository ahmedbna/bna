'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useConvexAuth, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Spinner } from '../spinner';
import { SignInButton } from '@clerk/clerk-react';

const formSchema = z.object({
  title: z.string().min(2).max(1000),
  excerpt: z.string().min(10),
});

export const NewPostModal = () => {
  const { isLoading, isAuthenticated } = useConvexAuth();

  if (isLoading) {
    return (
      <div className='h-full flex items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const create = useMutation(api.posts.create);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      excerpt: '',
    },
  });

  const handleOpenChange = () => {
    form.setValue('title', '');
    form.setValue('excerpt', '');

    setOpen(!open);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    const promise = create({ title: values.title });

    toast.promise(promise, {
      loading: 'Creating post...',
      success: 'Post created!',
      error: 'Something went wrong',
    });

    promise
      .then((postId) => {
        if (postId) router.push(`me/post/draft/${postId}`);
      })
      .finally(() => {
        setLoading(false);
        handleOpenChange();
      });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {/* <DialogTrigger asChild className='w-full'> */}
        <Button variant='secondary'>New Post</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        {!isLoading && !isAuthenticated ? (
          <SignInButton mode='modal'>
            <Button onClick={() => setOpen(false)} className='mt-8 mb-4 mx-2'>
              Login to create a post
            </Button>
          </SignInButton>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Start new post</DialogTitle>
                <DialogDescription>
                  Add a title and excerpt to get started.
                </DialogDescription>
              </DialogHeader>

              <div className='my-4 space-y-8'>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder='Write a post title' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='excerpt'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Write a short summary of your post with a glimpse of the content.'
                          className='resize-none min-h-[100px]'
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button type='submit' disabled={loading}>
                  {loading ? <Spinner /> : 'Start new Post'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
