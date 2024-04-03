'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error() {
  return (
    <>
      <p>Something went wrong!</p>
      <Button asChild>
        <Link href='/'>Home</Link>
      </Button>
    </>
  );
}
