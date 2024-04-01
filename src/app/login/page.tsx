'use client';
import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/clerk-react';
import { useConvexAuth } from 'convex/react';

export default function Login() {
  const { isLoading, isAuthenticated } = useConvexAuth();

  return (
    <div className='h-full flex items-center justify-center'>
      {!isLoading && !isAuthenticated && (
        <>
          <SignInButton mode='modal'>
            <Button>Login</Button>
          </SignInButton>
        </>
      )}
    </div>
  );
}
