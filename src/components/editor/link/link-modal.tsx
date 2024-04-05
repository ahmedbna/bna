'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
  open: boolean;
  link: string;
  setOpen: (open: boolean) => void;
  handleLinkChange: (link: string) => void;
};

export const LinkModal = ({ open, setOpen, link, handleLinkChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='w-full'>Change Link</Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Embed Link</DialogTitle>
          <DialogDescription>
            Paste a link to embed into your post.
          </DialogDescription>
        </DialogHeader>
        <div className='flex items-center space-x-2'>
          <div className='grid flex-1 gap-2'>
            <Label htmlFor='link' className='sr-only'>
              Link
            </Label>
            <Input
              id='link'
              value={link}
              placeholder='https://add-link-here.com'
              onChange={(event) => handleLinkChange(event.target.value)}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
