'use client';

import { useState } from 'react';
import { useEdgeStore } from '@/lib/edgestore';
import { SingleImageDropzone } from '../uploadImage';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { ImageUp } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

type Props = {
  clubSlug: string;
};

export const SendImage = ({ clubSlug }: Props) => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const { edgestore } = useEdgeStore();
  const comment = useMutation(api.clubhouses.create);

  const handleSendImage = () => {
    setDisabled(true);
    if (file) {
      const promise = edgestore.publicFiles
        .upload({
          file,
          onProgressChange: (progress) => {
            // you can use this to show a progress bar
            console.log('progress', progress);
          },
        })
        .then((res) => {
          comment({
            clubSlug: clubSlug,
            content: res.url,
            contentType: 'image',
          });
        })
        .finally(() => {
          setFile(undefined);
          setOpen(false);
          setDisabled(false);
        });

      toast.promise(promise, {
        loading: 'Sending image...',
        success: 'Image Sent!',
        error: 'Something went wrong',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <ImageUp className='w-5 h-5 cursor-pointer' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Image</DialogTitle>
          <DialogDescription>
            {`Drag & drop or select an image to send.`}
          </DialogDescription>
        </DialogHeader>
        <SingleImageDropzone
          height={200}
          value={file}
          onChange={(file) => setFile(file)}
        />
        <DialogFooter className='w-full'>
          <Button
            disabled={disabled}
            onClick={handleSendImage}
            className='w-full'
          >
            Send Image
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
