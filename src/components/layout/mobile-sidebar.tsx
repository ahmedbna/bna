'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Spinner } from '../spinner';
import { NewPost } from '../post/new-post';
import { ProPlan } from '../pro/pro-plan';
import { ModeToggle } from '../mode-toggle';
import { useConvexAuth } from 'convex/react';
import { SignInButton, useUser } from '@clerk/clerk-react';
import { AvatarImage, Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AvatarIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export const MobileSidebar = () => {
  const router = useRouter();
  const { user } = useUser();
  const { isLoading, isAuthenticated } = useConvexAuth();

  const clubs = useQuery(api.clubs.getClubs);
  const join = useMutation(api.clubguests.join);

  if (clubs === undefined) {
    return (
      <div className='h-full flex items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  const handleJoinClubhouse = (club: Doc<'clubs'>) => {
    const promise = join({ clubId: club._id, clubSlug: club.slug }).finally(
      () => {
        router.push(`/clubhouse/${club.slug}`);
      }
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon'>
          <Menu className='h-6 w-6' />
          <span className='sr-only'>Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent className='h-full flex flex-col gap-4 px-3 pt-4'>
        <div className='bg-background flex items-center w-full pb-2 gap-4 border-b shadow-sm'>
          {isLoading && <Spinner />}

          {!isLoading && !isAuthenticated && (
            <>
              <SignInButton mode='modal'>
                <Button className='p-1.5' variant='ghost'>
                  <AvatarIcon className='w-6 h-6' />
                </Button>
              </SignInButton>
            </>
          )}

          {!isLoading && isAuthenticated && (
            <Link href='/me'>
              <Avatar className='h-7 w-7 ml-2'>
                <AvatarImage src={user?.imageUrl} alt={user?.fullName || ''} />
                <AvatarFallback>
                  {user?.firstName?.charAt(0)}
                  {user?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Link>
          )}
          <ModeToggle />
        </div>

        <NewPost />

        <div className='flex-1 overflow-y-auto'>
          <h2 className='px-5 text-xl font-bold tracking-tight'>Clubs</h2>

          <div className='space-y-1 p-2'>
            {clubs?.map((club) => (
              <Button
                key={club._id}
                variant='ghost'
                onClick={() => handleJoinClubhouse(club)}
                className='w-full items-center justify-start font-normal'
              >
                {club.name}
              </Button>
            ))}
          </div>
        </div>

        <ProPlan />
      </SheetContent>
    </Sheet>
  );
};
