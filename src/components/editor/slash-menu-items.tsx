'use client';

import {
  DefaultReactSuggestionItem,
  getDefaultReactSlashMenuItems,
} from '@blocknote/react';

import { schema } from './schema';
import { insertAlert } from './alert/insert-alart';
import { insertCheckbox } from './checkbox/insert-checkbox';
import { insertCode } from './code/insert-code';
import { insertLinkPreview } from './link/insert-link-preview';

// List containing all default Slash Menu Items, as well as our custom one.
export const getCustomSlashMenuItems = (
  editor: typeof schema.BlockNoteEditor
): DefaultReactSuggestionItem[] => [
  ...getDefaultReactSlashMenuItems(editor),
  insertCode(editor),
  insertLinkPreview(editor),
  insertCheckbox(editor),
  insertAlert(editor),
  // insertEmoji(editor),
  // insertCalendar(editor),
];
