'use client';
import { Button } from '@/components/ui/button';
import { SignOutButton } from '@clerk/clerk-react';

export default function Account() {
  return (
    <div className='h-full'>
      <SignOutButton>
        <Button>Logout</Button>
      </SignOutButton>
    </div>
  );
}
