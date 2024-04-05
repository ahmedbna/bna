import { insertOrUpdateBlock } from '@blocknote/core';
import { schema } from '../schema';
import { Calendar, Link } from 'lucide-react';

// Slash menu item to insert an Alert block
export const insertLinkPreview = (editor: typeof schema.BlockNoteEditor) => ({
  title: 'Embed Link',
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: 'linkPreview',
    });
  },
  aliases: ['link', 'embed', 'url'],
  group: 'More',
  icon: <Link className='w-6 h-6 p-1' />,
  subtext: 'Embed a link into your post.',
});
