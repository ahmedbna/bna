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
import { Textarea } from '../ui/textarea';
import { Spinner } from '../spinner';
import { generateSlug } from '@/lib/generate-slug';
import { Id } from '@/convex/_generated/dataModel';

const FormSchema = z.object({
  name: z.string().min(3, {
    message: 'Club name must be at least 3 characters.',
  }),
});

type Props = {
  postId: Id<'posts'>;
};

export const AddToClub = ({ postId }: Props) => {
  const [open, setOpen] = useState(false);
  const create = useMutation(api.clubs.create);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const slug = generateSlug(data.name);

    const promise = create({
      name: data.name,
      slug: slug,
      postId: postId,
    }).finally(() => {
      form.setValue('name', '');
      setOpen(false);
    });

    toast.promise(promise, {
      loading: 'Adding to club...',
      success: 'Added to club!',
      error: 'Something went wrong',
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Add To Club</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add To Club</DialogTitle>
          <DialogDescription>
            Write a club name then click add to club
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=' space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Club Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type='submit'>Add To Club</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
