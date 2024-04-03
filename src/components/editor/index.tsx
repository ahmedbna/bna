'use client';

import { Block } from '@blocknote/core';
import { BlockNoteView, useCreateBlockNote } from '@blocknote/react';
import '@blocknote/core/style.css';
import '@blocknote/react/style.css';
import '@blocknote/core/fonts/inter.css';
import { useTheme } from 'next-themes';

import { useEdgeStore } from '@/lib/edgestore';

type EditorProps = {
  editable?: boolean;
  initialContent?: Array<Block>;
  handleChangeContent: (value: Array<Block>) => void;
};

const Editor = ({
  editable = true,
  initialContent,
  handleChangeContent,
}: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUploadImage = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ file });
    return response.url;
  };

  const editor = useCreateBlockNote({
    initialContent: initialContent ? initialContent : undefined,
    uploadFile: handleUploadImage,
  });

  return (
    <BlockNoteView
      editor={editor}
      editable={editable}
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      onChange={() => {
        handleChangeContent(editor.document);
      }}
      className='w-full h-full flex flex-col '
    />
  );
};

export default Editor;
