'use client';

import React, { useState, useEffect } from 'react';
import { CopyIcon } from '@radix-ui/react-icons';
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

type Props = {
  link: string;
  handleLinkChange: (link: string) => void;
};

interface PreviweResponseType {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export const LinkPreview = ({ link, handleLinkChange }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewData, setPreviewData] = useState<
    PreviweResponseType | undefined
  >(undefined);

  const API_KEY = 'ffebcffd383bd10d4d1d73dcc2537306';

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.linkpreview.net/?key=${API_KEY}&q=${link}`
      );
      const data = await response.json();
      setPreviewData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  // useEffect(() => {
  //   if (link) {
  //     fetchData();
  //   }
  // }, [link]);

  if (loading) {
    return <div>Loading preview...</div>;
  }

  // if (!previewData) {
  //   return <div>Failed to fetch preview.</div>;
  // }

  return (
    <div className='w-full'>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='outline'>Embed Link</Button>
        </DialogTrigger>

        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Embed Link</DialogTitle>
            <DialogDescription>Embed link into your post.</DialogDescription>
          </DialogHeader>
          <div className='flex items-center space-x-2'>
            <div className='grid flex-1 gap-2'>
              <Label htmlFor='link' className='sr-only'>
                Link
              </Label>
              <Input
                id='link'
                placeholder='https://add-link-here.com'
                onChange={(event) => handleLinkChange(event.target.value)}
              />
            </div>

            <Button size='sm' className='px-3' onClick={fetchData}>
              <span className='sr-only'>Embed Link</span>
              <CopyIcon className='h-4 w-4' />
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

      <a
        href={link}
        target='_blank'
        rel='noopener noreferrer'
        className='w-full flex flex-col items-start justify-center gap-1'
      >
        {previewData?.image && (
          <img src={previewData?.image} alt={previewData?.title} />
        )}

        {previewData?.title ? previewData?.title : 'Visit Link'}
      </a>

      {/* {previewData?.description && <p>{previewData?.description}</p>}  */}
    </div>
  );
};
