'use client';

import { createReactBlockSpec } from '@blocknote/react';
import { CodeEditor } from './code-editor';

// The Checkbox block.
export const CodeBlock = createReactBlockSpec(
  {
    type: 'codeBolck',
    content: 'none',
    propSchema: {
      codeLanguage: {
        default: 'javascript',
      },
      codeString: {
        default: ``,
      },
    },
  },
  {
    render: (props) => {
      return (
        <div className=' w-full flex items-center justify-center flex-grow'>
          <CodeEditor
            ref={props.contentRef}
            codeString={props.block.props.codeString}
            language={props.block.props.codeLanguage}
            setCodeString={(code) =>
              props.editor.updateBlock(props.block, {
                type: 'codeBolck',
                props: { codeString: code },
              })
            }
            handleSelectedLanguage={(language) =>
              props.editor.updateBlock(props.block, {
                type: 'codeBolck',
                props: { codeLanguage: language },
              })
            }
          />
        </div>
      );
    },
  }
);
