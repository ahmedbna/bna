import { insertOrUpdateBlock } from '@blocknote/core';
import { schema } from '../schema';
import { SquareCheck } from 'lucide-react';

// Slash menu item to insert an Alert block
export const insertCheckbox = (editor: typeof schema.BlockNoteEditor) => ({
  title: 'Checkbox',
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: 'checkbox',
    });
  },
  aliases: ['checbox', 'check', 'box'],
  group: 'Other',
  icon: <SquareCheck className='w-6 h-6 p-1' />,
  subtext: 'Insert checkbox into your post.',
});
