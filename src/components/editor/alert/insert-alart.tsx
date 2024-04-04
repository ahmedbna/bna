import { insertOrUpdateBlock } from '@blocknote/core';
import { schema } from '../schema';
import { AlertCircle } from 'lucide-react';

// Slash menu item to insert an Alert block
export const insertAlert = (editor: typeof schema.BlockNoteEditor) => ({
  title: 'Alert',
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: 'alert',
    });
  },
  aliases: [
    'alert',
    'notification',
    'emphasize',
    'warning',
    'error',
    'info',
    'success',
  ],
  group: 'Other',
  icon: <AlertCircle className='w-6 h-6 p-1' />,
  subtext: 'Insert an alart into your post.',
});
