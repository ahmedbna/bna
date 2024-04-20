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
import { Spinner } from '../spinner';

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
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const { edgestore } = useEdgeStore();

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const comment = useMutation(api.clubhouses.create);
  const reply = useMutation(api.clubhouses.reply);

  const postComment = useMutation(api.comments.comment);
  const postReply = useMutation(api.comments.reply);

  const handleSendImage = async () => {
    setDisabled(true);
    setLoading(true);
    if (file) {
      const contentType = file.type.split('/')[0];

      if (clubSlug) {
        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
          method: 'POST',
          headers: { 'Content-Type': file.type },
          body: file,
        });
        const { storageId } = await result.json();

        if (parentComment) {
          await reply({
            clubSlug: clubSlug,
            content: '',
            storageId: storageId,
            contentType: contentType,
            parentId: parentComment._id,
          });
        } else {
          await comment({
            clubSlug: clubSlug,
            content: '',
            storageId: storageId,
            contentType: contentType,
          });
        }
        setFile(undefined);
        setOpen(false);
        setDisabled(false);
        setParentComment(undefined);
      } else {
        const promise = edgestore.publicFiles
          .upload({
            file,
            onProgressChange: (progress) => {
              // you can use this to show a progress bar
              console.log('progress', progress);
            },
          })
          .then((res) => {
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
    }
    setLoading(false);
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
            {loading ? <Spinner size='sm' /> : 'Send Image'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
