'use client';

import { createReactBlockSpec } from '@blocknote/react';
import { EmojiSelector } from './emoji-selector';

// The Emoji block.
export const EmojiBlock = createReactBlockSpec(
  {
    type: 'emoji',
    content: 'none',
    propSchema: {
      emoji: {
        default: '',
      },
    },
  },
  {
    render: (props) => {
      return (
        <div ref={props.contentRef}>
          {props.block.props.emoji}
          <EmojiSelector
            onChange={(newEmo) =>
              props.editor.updateBlock(props.block, {
                type: 'emoji',
                props: { emoji: newEmo },
              })
            }
          />
        </div>
      );
    },
  }
);
