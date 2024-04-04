import { insertOrUpdateBlock } from '@blocknote/core';
import { schema } from '../schema';
import { Calendar } from 'lucide-react';

// Slash menu item to insert an Alert block
export const insertCalendar = (editor: typeof schema.BlockNoteEditor) => ({
  title: 'Calendar',
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: 'calendar',
    });
  },
  aliases: ['calendar', 'cal', 'date'],
  group: 'Other',
  icon: <Calendar className='w-6 h-6 p-1' />,
  subtext: 'Insert calendar into your post.',
});
