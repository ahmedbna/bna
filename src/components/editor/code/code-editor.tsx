'use client';

import dynamic from 'next/dynamic';
import '@uiw/react-textarea-code-editor/dist.css';
import { useTheme } from 'next-themes';
import { SelectLanguage } from './select-language';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';

import { Fira_Code } from 'next/font/google';
import { cn } from '@/lib/utils';
const fira = Fira_Code({ subsets: ['latin'] });
import './styles.css';

type Props = {
  ref?: any;
  editable: boolean;
  language: string;
  codeString: string;
  setCodeString: (codeString: string) => void;
  handleSelectedLanguage: (value: string) => void;
};

export const CodeEditor = ({
  ref,
  editable,
  language,
  codeString,
  setCodeString,
  handleSelectedLanguage,
}: Props) => {
  const { resolvedTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  const CodeTextAeaEditor = useMemo(
    () =>
      dynamic(
        () =>
          import('@uiw/react-textarea-code-editor').then((mod) => mod.default),
        { ssr: false }
      ),
    []
  );

  return (
    <div className={cn(fira.className, 'w-full')}>
      <div
        className={cn(
          fira.className,
          'bg-[#f6f8fa] dark:bg-[#161b22] w-full flex items-center justify-between rounded-t-lg p-2'
        )}
      >
        <SelectLanguage
          selectedLanguage={language}
          handleSelectedLanguage={handleSelectedLanguage}
        />

        {copied ? (
          <Button
            variant='outline'
            onClick={() => null}
            className={cn(fira.className, 'bg-[#f6f8fa] dark:bg-[#161b22]')}
          >
            Copied!
          </Button>
        ) : (
          <Button
            variant='outline'
            onClick={() => {
              navigator.clipboard.writeText(codeString);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 3000);
            }}
            className={cn(fira.className, 'bg-[#f6f8fa] dark:bg-[#161b22]')}
          >
            Copy
          </Button>
        )}
      </div>

      <CodeTextAeaEditor
        ref={ref}
        disabled={!editable}
        value={codeString}
        language={language}
        placeholder='Please enter code here.'
        onChange={(event) => setCodeString(event.target.value)}
        data-color-mode={resolvedTheme === 'dark' ? 'dark' : 'light'}
        padding={20}
        style={{
          fontSize: 16,
          fontFamily: 'Fira Code, monospace',
        }}
        className={cn(
          fira.className,
          'flex flex-grow text-xl rounded-b-lg font-mono h-fit'
        )}
      />
    </div>
  );
};
