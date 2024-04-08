'use client';

import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { SignOutButton, UserButton } from '@clerk/clerk-react';
import { Cog } from 'lucide-react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { Textarea } from './ui/textarea';
import { Spinner } from './spinner';
import { Doc } from '@/convex/_generated/dataModel';

const FormSchema = z.object({
  heading: z.string().min(3, {
    message: 'Heading must be at least 3 characters.',
  }),
  bio: z.string().min(3, {
    message: 'Bio must be at least 3 characters.',
  }),
});

type Props = {
  heading?: string;
  bio?: string;
};

export const Settings = ({ heading, bio }: Props) => {
  const [open, setOpen] = useState(false);
  const update = useMutation(api.users.update);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      heading: heading || '',
      bio: bio || '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const promise = update({
      heading: data.heading,
      bio: data.bio,
    }).finally(() => {
      setOpen(false);
    });

    toast.promise(promise, {
      loading: 'Updating profile...',
      success: 'Profile Updated!',
      error: 'Something went wrong',
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' className='p-2'>
          <Cog className='w-5 h-5 cursor-pointer' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {/* <UserButton afterSignOutUrl='/' /> */}
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Add heading and bio to your profile.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=' space-y-4'>
            <FormField
              control={form.control}
              name='heading'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Heading</FormLabel>
                  <FormControl>
                    <Input placeholder='JavaScript Developer' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='bio'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Tell us a little bit about yourself'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className='w-full flex items-center sm:justify-between '>
              <Button variant='destructive'>
                <SignOutButton>Logout</SignOutButton>
              </Button>
              <Button type='submit'>Update Profile</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
