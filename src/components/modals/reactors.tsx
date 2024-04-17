import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { UserCard } from '../user-card';
import EmptyPage from '../empty-page';

interface UserInfo {
  email: string;
  name: string;
  pictureUrl: string;
  userId: string;
}

interface Reaction {
  emoji: string;
  count: number;
  userInfos: UserInfo[];
}

type Props = {
  reaction: Reaction;
};

export function Reactors({ reaction }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size='sm'
          variant='outline'
          className='rounded-lg gap-1 flex items-center'
        >
          <p className='text-base'>{reaction.emoji}</p>
          <p>{reaction.count}</p>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-lg text-start mb-4'>
            {`${reaction.emoji} (${reaction.count})`}
          </DialogTitle>
        </DialogHeader>
        <div className='max-h-[400px] rounded-lg overflow-y-auto'>
          {reaction.userInfos?.length ? (
            reaction.userInfos.map((user: any) => (
              <div key={user._id} className='mb-2'>
                <UserCard userInfo={user} />
              </div>
            ))
          ) : (
            <EmptyPage
              title={`No ${reaction.emoji}`}
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
