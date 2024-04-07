'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error() {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center'>
      <p>Something went wrong!</p>
      <Button asChild>
        <Link href='/'>Home</Link>
      </Button>
    </div>
  );
}
