import { insertOrUpdateBlock } from '@blocknote/core';
import { schema } from '../schema';
import { SmileIcon } from 'lucide-react';

// Slash menu item to insert an Alert block
export const insertEmoji = (editor: typeof schema.BlockNoteEditor) => ({
  title: 'Emoji',
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: 'emoji',
    });
  },
  aliases: ['emo', 'emoji'],
  group: 'Other',
  icon: <SmileIcon className='w-6 h-6 p-1' />,
  subtext: 'Insert emoji into your post.',
});
