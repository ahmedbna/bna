import { insertOrUpdateBlock } from '@blocknote/core';
import { schema } from '../schema';
import { Code2 } from 'lucide-react';

// Slash menu item to insert an Alert block
export const insertCode = (editor: typeof schema.BlockNoteEditor) => ({
  title: 'Code',
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: 'codeBolck',
    });
  },
  aliases: ['code'],
  group: 'More',
  icon: <Code2 className='w-6 h-6 p-1' />,
  subtext: 'Insert code into your post.',
});
