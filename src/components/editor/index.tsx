'use client';

import { useState } from 'react';
import { Block, PartialBlock } from '@blocknote/core';
import { BlockNoteView, useCreateBlockNote } from '@blocknote/react';
import '@blocknote/core/style.css';
import '@blocknote/react/style.css';
import '@blocknote/core/fonts/inter.css';
import { useTheme } from 'next-themes';

type EditorProps = {
  handleChangeContent: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
};

export default function Editor({
  handleChangeContent,
  initialContent,
  editable = true,
}: EditorProps) {
  const { resolvedTheme } = useTheme();
  const [blocks, setBlocks] = useState<Block[]>([]);

  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
  });

  return (
    <BlockNoteView
      editor={editor}
      editable={editable}
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      onChange={() => {
        // Saves the document JSON to state.
        setBlocks(editor.document);
        handleChangeContent(JSON.stringify(editor.document, null, 2));
      }}
      className='w-full h-full flex flex-col '
    />
  );
}
