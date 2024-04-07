'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlanCard } from './plan-card';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

export const ProCard = () => {
  const [email, setEmail] = useState('');
  const add = useMutation(api.waitings.add);

  const handleJoin = () => {
    const promise = add({
      email,
    });

    toast.promise(promise, {
      loading: 'Joining...',
      success:
        'Excited to have you on the waitlist! 🚀 Stay tuned for updates.',
      error: 'Something went wrong',
    });
  };

  return (
    <Dialog>
      <DialogTrigger className='cursor-pointer'>
        <PlanCard />
      </DialogTrigger>

      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Join waitlist</DialogTitle>
          <DialogDescription>
            Add your email to join waitlist. We're working hard on it. In the
            meantime, feel free to explore our website or reach out if you have
            any questions!
          </DialogDescription>
        </DialogHeader>
        <div className='flex items-center space-x-2'>
          <div className='grid flex-1 gap-2'>
            <Label htmlFor='email' className='sr-only'>
              Add Email
            </Label>
            <Input
              id='email'
              type='email'
              placeholder='me@email.com'
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </div>
        <DialogFooter className='sm:justify-start'>
          <DialogClose asChild>
            <Button className='w-full' type='button' onClick={handleJoin}>
              Join
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
