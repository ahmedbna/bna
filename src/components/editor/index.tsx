'use client';

import { useTheme } from 'next-themes';
import { Block, filterSuggestionItems, PartialBlock } from '@blocknote/core';
import {
  BlockNoteView,
  useCreateBlockNote,
  SuggestionMenuController,
} from '@blocknote/react';
import '@blocknote/core/style.css';
import '@blocknote/react/style.css';
import '@blocknote/core/fonts/inter.css';

import { useEdgeStore } from '@/lib/edgestore';
import { getCustomSlashMenuItems } from './slash-menu-items';
import { schema } from './schema';
import { getMentionMenuItems } from './mention/getMentionMenuItems';

type EditorProps = {
  editable?: boolean;
  initialContent?: string;
  handleChangeContent: (value: string) => void;
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
    schema,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as Array<typeof schema.Block>)
      : undefined,
    uploadFile: handleUploadImage,
  });

  return (
    <BlockNoteView
      imageToolbar
      linkToolbar
      editor={editor}
      editable={editable}
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      slashMenu={false}
      onChange={() => {
        handleChangeContent(JSON.stringify(editor.document, null, 2));
      }}
      className='w-full h-full flex flex-col pb-96 '
    >
      <SuggestionMenuController
        triggerCharacter={'/'}
        // Replaces the default Slash Menu items with our custom ones.
        getItems={async (query) =>
          filterSuggestionItems(getCustomSlashMenuItems(editor), query)
        }
      />
      {/* <SuggestionMenuController
        triggerCharacter={'@'}
        getItems={async (query) =>
          // Gets the mentions menu items
          filterSuggestionItems(getMentionMenuItems(editor), query)
        }
      /> */}
    </BlockNoteView>
  );
};

export default Editor;
