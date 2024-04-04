import {
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultInlineContentSpecs,
  defaultStyleSpecs,
} from '@blocknote/core';
import { CodeBlock } from './code';
import { AlertBlock } from './alert';
import { EmojiBlock } from './emoji';
import { CheckboxBlock } from './checkbox';

export const schema = BlockNoteSchema.create({
  blockSpecs: {
    // enable the default blocks if desired
    ...defaultBlockSpecs,

    // Add your own custom blocks:
    // customBlock: CustomBlock,
    codeBolck: CodeBlock,
    alert: AlertBlock,
    emoji: EmojiBlock,
    checkbox: CheckboxBlock,
  },
  inlineContentSpecs: {
    // enable the default inline content if desired
    ...defaultInlineContentSpecs,

    // Add your own custom inline content:
    // customInlineContent: CustomInlineContent,
  },
  styleSpecs: {
    // enable the default styles if desired
    ...defaultStyleSpecs,

    // Add your own custom styles:
    // customStyle: CustomStyle
  },
});
