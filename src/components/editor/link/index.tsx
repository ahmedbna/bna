'use client';

import { createReactBlockSpec } from '@blocknote/react';
import { LinkPreview } from './link-preview';

// The LinkPreview block.
export const LinkPreviewBlock = createReactBlockSpec(
  {
    type: 'linkPreview',
    content: 'none',
    propSchema: {
      link: {
        default: '',
      },
    },
  },
  {
    render: (props) => {
      return (
        <div className='flex items-center justify-center flex-grow'>
          <LinkPreview
            link={props.block.props.link}
            handleLinkChange={(url) =>
              props.editor.updateBlock(props.block, {
                type: 'linkPreview',
                props: { link: url },
              })
            }
          />
        </div>
      );
    },
  }
);
