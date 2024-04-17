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
import { Id } from '@/convex/_generated/dataModel';

type Props = {
  postId?: Id<'posts'>;
  clubSlug?: string;
  parentComment: any;
  setParentComment: any;
};

export const SendImage = ({
  postId,
  clubSlug,
  parentComment,
  setParentComment,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const { edgestore } = useEdgeStore();

  const comment = useMutation(api.clubhouses.create);
  const reply = useMutation(api.clubhouses.reply);

  const postComment = useMutation(api.comments.comment);
  const postReply = useMutation(api.comments.reply);

  const handleSendImage = () => {
    setDisabled(true);
    if (file) {
      const contentType = file.type.split('/')[0];
      const promise = edgestore.publicFiles
        .upload({
          file,
          onProgressChange: (progress) => {
            // you can use this to show a progress bar
            console.log('progress', progress);
          },
        })
        .then((res) => {
          if (clubSlug) {
            if (parentComment) {
              reply({
                clubSlug: clubSlug,
                content: res.url,
                contentType: contentType,
                parentId: parentComment._id,
              });
            } else {
              comment({
                clubSlug: clubSlug,
                content: res.url,
                contentType: contentType,
              });
            }
          }

          if (postId) {
            if (parentComment) {
              postReply({
                postId: postId,
                content: res.url,
                contentType: contentType,
                parentId: parentComment._id,
              });
            } else {
              postComment({
                postId: postId,
                content: res.url,
                contentType: contentType,
              });
            }
          }
        })
        .finally(() => {
          setFile(undefined);
          setOpen(false);
          setDisabled(false);
          setParentComment(undefined);
        });

      toast.promise(promise, {
        loading: 'Uploading...',
        success: 'Sent!',
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
            disabled={!file || disabled}
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
