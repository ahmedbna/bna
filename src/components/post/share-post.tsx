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
import { CopyIcon } from '@radix-ui/react-icons';
import { CheckCheck, Send } from 'lucide-react';

type Props = {
  size?: 'sm' | 'default' | 'lg' | 'icon' | null;
  postId: string;
};

export function SharePost({ postId, size = 'sm' }: Props) {
  const [copied, setCopied] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size={size} className='rounded-lg'>
          <Send className='w-5 h-5' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Share post</DialogTitle>
          <DialogDescription>Share post with your frinds.</DialogDescription>
        </DialogHeader>
        <div className='flex items-center space-x-2'>
          <div className='grid flex-1 gap-2'>
            <Label htmlFor='link' className='sr-only'>
              Link
            </Label>
            <Input
              id='link'
              readOnly
              defaultValue={`${process.env.NEXT_PUBLIC_APP_URL}/post/${postId}`}
            />
          </div>
          <Button
            size='sm'
            className='px-3'
            onClick={() => {
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_APP_URL}/post/${postId}`
              );
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 3000);
            }}
          >
            <span className='sr-only'>Copy</span>
            {copied ? (
              <CheckCheck className='h-4 w-4' />
            ) : (
              <CopyIcon className='h-4 w-4' />
            )}
          </Button>
        </div>
        <DialogFooter className='sm:justify-start'>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
