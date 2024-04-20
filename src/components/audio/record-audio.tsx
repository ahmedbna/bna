'use client';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useVoiceVisualizer, VoiceVisualizer } from 'react-voice-visualizer';
import './styles.css';
import { Button } from '../ui/button';
import { Mic } from 'lucide-react';
import { useEdgeStore } from '@/lib/edgestore';
import { convertBlobToAudio } from '@/lib/convertBlobToAudio';
import { toast } from 'sonner';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useTheme } from 'next-themes';
import { Spinner } from '../spinner';

type Props = {
  postId?: Id<'posts'>;
  clubSlug?: string;
  parentComment: any;
  setParentComment: any;
};

export const RecordAudio = ({
  postId,
  clubSlug,
  parentComment,
  setParentComment,
}: Props) => {
  const { edgestore } = useEdgeStore();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [blob, setBlob] = useState<Blob | null>(null);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const comment = useMutation(api.clubhouses.create);
  const reply = useMutation(api.clubhouses.reply);

  const postComment = useMutation(api.comments.comment);
  const postReply = useMutation(api.comments.reply);

  // Initialize the recorder controls using the hook
  const recorderControls = useVoiceVisualizer();

  const {
    // ... (Extracted controls and states, if necessary)
    error,
    audioRef,
    recordedBlob,
    clearCanvas,
  } = recorderControls;

  // Get the recorded audio blob
  useEffect(() => {
    if (!recordedBlob) return;

    setBlob(recordedBlob);

    // console.log('recordedBlob', recordedBlob);
  }, [recordedBlob, error]);

  // Get the error when it occurs
  useEffect(() => {
    if (!error) return;
    console.error(error);
  }, [error]);

  const handleSendAudio = async () => {
    if (!blob) return;
    setDisabled(true);
    setLoading(true);

    try {
      const audioBlob = (await convertBlobToAudio(blob)) as Blob;
      const audioFile = new File([audioBlob], 'a.wav', { type: blob.type });

      if (clubSlug) {
        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
          method: 'POST',
          headers: { 'Content-Type': audioFile.type },
          body: audioFile,
        });
        const { storageId } = await result.json();

        if (parentComment) {
          await reply({
            clubSlug: clubSlug,
            content: '',
            storageId: storageId,
            contentType: 'audio',
            parentId: parentComment._id,
          });
        } else {
          await comment({
            clubSlug: clubSlug,
            content: '',
            storageId: storageId,
            contentType: 'audio',
          });
        }
        setBlob(null);
        clearCanvas();
        setOpen(false);
        setDisabled(false);
        setParentComment(undefined);
      } else {
        const promise = edgestore.publicFiles
          .upload({
            file: audioFile,
            onProgressChange: (progress) => {
              // you can use this to show a progress bar
              console.log(progress);
            },
          })
          .then((res) => {
            if (postId) {
              if (parentComment) {
                postReply({
                  postId: postId,
                  content: res.url,
                  contentType: 'audio',
                  parentId: parentComment._id,
                });
              } else {
                postComment({
                  postId: postId,
                  content: res.url,
                  contentType: 'audio',
                });
              }
            }
          })
          .finally(() => {
            setBlob(null);
            clearCanvas();
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
    } catch (error) {
      console.error('Error converting blob to audio:', error);
    }
    setLoading(false);
  };

  const handleOpenChange = () => {
    setOpen(!open);
    setBlob(null);
    clearCanvas();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Mic className='w-5 h-5 cursor-pointer' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Record your messsage</DialogTitle>
          <DialogDescription>Click on mic to start recording</DialogDescription>
        </DialogHeader>
        <div className='w-full'>
          <VoiceVisualizer
            ref={audioRef}
            controls={recorderControls}
            height={100}
            barWidth={10}
            gap={1}
            rounded={10}
            isControlPanelShown={true}
            isDefaultUIShown={false}
            mainBarColor='red'
            secondaryBarColor='#5e5e5e'
            controlButtonsClassName='font-bold text-black bg-black'
          />
        </div>
        <DialogFooter className='w-full'>
          <Button
            size='lg'
            className='w-full text-lg font-bold'
            disabled={!recordedBlob || !blob || disabled}
            onClick={handleSendAudio}
          >
            {loading ? <Spinner size='sm' /> : 'Send Audio Message'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
