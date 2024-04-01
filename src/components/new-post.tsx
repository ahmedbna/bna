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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { toast } from 'sonner';

const formSchema = z.object({
  title: z.string().min(2).max(1000),
});

export function NewPost() {
  const create = useMutation(api.posts.create);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    const response = create({ title: values.title });

    console.log(response);

    toast.promise(response, {
      loading: 'Creating post...',
      success: 'Post created!',
      error: 'Something went wrong',
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>New Post</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Create new post</DialogTitle>
              <DialogDescription>Add a title to get started.</DialogDescription>
            </DialogHeader>

            <div className='mt-4 space-y-8'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder='Untitled' {...field} />
                    </FormControl>
                    <FormDescription>This is your post title</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type='submit'>Create Post</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
