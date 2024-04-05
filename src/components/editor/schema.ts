import {
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultInlineContentSpecs,
  defaultStyleSpecs,
} from '@blocknote/core';
import { CodeBlock } from './code';
import { AlertBlock } from './alert';
import { CheckboxBlock } from './checkbox';
import { LinkPreviewBlock } from './link';
import { Mention } from './mention';
import { Font } from './code/font';

export const schema = BlockNoteSchema.create({
  blockSpecs: {
    // enable the default blocks if desired
    ...defaultBlockSpecs,

    // Add your own custom blocks:
    // customBlock: CustomBlock,
    codeBolck: CodeBlock,
    alert: AlertBlock,
    checkbox: CheckboxBlock,
    linkPreview: LinkPreviewBlock,
  },
  inlineContentSpecs: {
    // enable the default inline content if desired
    ...defaultInlineContentSpecs,

    // Add your own custom inline content:
    // customInlineContent: CustomInlineContent,
    mention: Mention,
    // emoji: Emoji,
  },
  styleSpecs: {
    // enable the default styles if desired
    ...defaultStyleSpecs,

    // Add your own custom styles:
    // customStyle: CustomStyle
    font: Font,
  },
});
