import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { UserCard } from './user-card';
import EmptyPage from './empty-page';

type Props = {
  title: string;
  follows: any;
  // follows: Array<Doc<'follows'>>;
};

export function FollowersModal({ title, follows }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild className='cursor-pointer'>
        <div className='flex flex-col items-center'>
          <p className='text-2xl font-bold leading-none'>
            {follows?.length ? follows?.length.toString() : '0'}
          </p>
          <p className='text-md text-muted-foreground mt-2'>{title}</p>
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-start mb-4'>{title}</DialogTitle>
        </DialogHeader>
        <div className='max-h-[400px] rounded-lg overflow-y-auto'>
          {follows?.length ? (
            follows.map((follow: any) => (
              <div key={follow._id} className='mb-2'>
                <UserCard userInfo={follow.userInfo} />
              </div>
            ))
          ) : (
            <EmptyPage
              title={`No ${title}`}
              description='Expand your network'
            />
          )}
        </div>
        <DialogFooter className='mt-4'>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
