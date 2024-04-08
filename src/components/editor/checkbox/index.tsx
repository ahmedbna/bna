'use client';

import { createReactBlockSpec } from '@blocknote/react';
import { Checkbox } from '@/components/ui/checkbox';

// The Checkbox block.
export const CheckboxBlock = createReactBlockSpec(
  {
    type: 'checkbox',
    content: 'inline',
    propSchema: {
      isCheck: {
        default: false,
        values: [true, false],
      },
    },
  },
  {
    render: (props) => {
      return (
        <div className='flex items-center justify-center flex-grow gap-2'>
          <Checkbox
            disabled={!props.editor.isEditable}
            checked={props.block.props.isCheck}
            onCheckedChange={(checked: boolean) =>
              props.editor.updateBlock(props.block, {
                type: 'checkbox',
                props: { isCheck: checked },
              })
            }
          />

          {/*Rich text field for user to type in*/}
          <div className='flex-grow' ref={props.contentRef} />
        </div>
      );
    },
  }
);
