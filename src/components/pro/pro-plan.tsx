'use client';

import Link from 'next/link';
import { Button } from '../ui/button';

export const ProPlan = () => {
  return (
    <Button
      asChild
      variant='outline'
      className='bg-muted/50 flex flex-col w-full items-start py-10'
    >
      <Link href='/pro'>
        <p className='text-lg font-bold'>BNA Pro</p>
        <p className='text-sm text-muted-foreground'>
          Ignite Creativity with AI
        </p>
      </Link>
    </Button>
  );
};
