'use client';

import { createReactBlockSpec } from '@blocknote/react';
import { Calendar } from '@/components/ui/calendar';

// The Checkbox block.
export const CalendarBlock = createReactBlockSpec(
  {
    type: 'calendar',
    content: 'inline',
    propSchema: {
      date: {
        default: new Date().toDateString(),
      },
    },
  },
  {
    render: (props) => {
      return (
        <div className='flex items-center justify-center flex-grow gap-2'>
          <Calendar
            disabled={!props.editor.isEditable}
            mode='single'
            selected={new Date(props.block.props.date)}
            onSelect={(date) =>
              props.editor.updateBlock(props.block, {
                type: 'calendar',
                props: { date: date?.toDateString() },
              })
            }
            className='rounded-md border shadow'
          />

          {/*Rich text field for user to type in*/}
          <div className='flex-grow' ref={props.contentRef} />
        </div>
      );
    },
  }
);
