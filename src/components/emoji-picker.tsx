'use client';

import EmojiSelector, { Theme } from 'emoji-picker-react';
import { useTheme } from 'next-themes';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { SmilePlus } from 'lucide-react';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  onChange: (icon: string) => void;
}

export const EmojiPicker = ({ open, setOpen, onChange }: Props) => {
  const { resolvedTheme } = useTheme();
  const currentTheme = (resolvedTheme || 'light') as keyof typeof themeMap;

  const themeMap = {
    dark: Theme.DARK,
    light: Theme.LIGHT,
  };

  const theme = themeMap[currentTheme];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size='sm' variant='outline'>
          <SmilePlus className='w-4 h-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0 w-full border-none shadow-none'>
        <EmojiSelector
          height={400}
          theme={theme}
          previewConfig={{ showPreview: false }}
          onEmojiClick={(data) => onChange(data.emoji)}
        />
      </PopoverContent>
    </Popover>
  );
};
