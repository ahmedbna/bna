'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Fira_Code } from 'next/font/google';
import { languages } from './languages';
const fira = Fira_Code({ subsets: ['latin'] });

type Props = {
  selectedLanguage: string;
  handleSelectedLanguage: (value: string) => void;
};

export function SelectLanguage({
  selectedLanguage,
  handleSelectedLanguage,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn(
            fira.className,
            'w-[200px] justify-between bg-[#f6f8fa] dark:bg-[#161b22]'
          )}
        >
          {selectedLanguage
            ? languages.find((language) => language.value === selectedLanguage)
                ?.label
            : 'Select language...'}
          <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search language...' className='h-9' />
          <CommandEmpty>No language found.</CommandEmpty>
          <CommandGroup className='max-h-[300px] overflow-y-auto'>
            {languages.map((language) => (
              <CommandItem
                value={language.value}
                key={language.value}
                onSelect={(value) => {
                  handleSelectedLanguage(value);
                  setOpen(false);
                }}
                className={cn(fira.className)}
              >
                <div className='ml-2'>{language.label}</div>
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    selectedLanguage === language.value
                      ? 'opacity-100'
                      : 'opacity-0'
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
