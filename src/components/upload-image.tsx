'use client';

import { useMutation } from 'convex/react';
import { UploadDropzone, UploadFileResponse } from '@xixixao/uploadstuff/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';
import '@xixixao/uploadstuff/react/styles.css';
import { toast } from 'sonner';

type Props = {
  postId: Id<'posts'>;
};
export const UploadImage = ({ postId }: Props) => {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const update = useMutation(api.posts.update);

  const saveAfterUpload = async (uploaded: UploadFileResponse[]) => {
    const response = update({
      id: postId,
      coverImage: (uploaded[0].response as any).storageId,
    });

    toast.promise(response, {
      loading: 'Uploading image...',
      success: 'Image uploaded!',
      error: 'Something went wrong',
    });
  };

  return (
    <UploadDropzone
      subtitle='Choose image then click upload!'
      uploadUrl={generateUploadUrl}
      fileTypes={{
        'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
      }}
      onUploadComplete={saveAfterUpload}
      onUploadError={(error: unknown) => {
        alert(`ERROR! ${error}`);
      }}
    />
  );
};
