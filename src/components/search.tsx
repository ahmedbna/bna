'use client';

import { useEffect, useState } from 'react';
import { useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';
import { useSearch } from '@/hooks/use-search';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { api } from '../../convex/_generated/api';

export const SearchCommand = () => {
  const router = useRouter();
  const { user } = useUser();
  const posts = useQuery(api.posts.searchPosts, {
    query: 'Search query',
  });

  const [isMounted, setIsMounted] = useState(false);

  const open = useSearch((store) => store.isOpen);
  const toggle = useSearch((store) => store.toggle);
  const onClose = useSearch((store) => store.onClose);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const onSelect = (postId: string) => {
    router.push(`/post/${postId}`);
    onClose();
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* <p className='text-sm text-muted-foreground'>
        Press{' '}
        <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
          <span className='text-xs'>⌘</span>J
        </kbd>
      </p> */}
      <CommandDialog open={open} onOpenChange={onClose}>
        <CommandInput placeholder='Type to search posts...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Suggestions'>
            {posts?.map((post) => (
              <CommandItem
                key={post._id}
                value={`${post._id}-${post.title}`}
                title={post.title}
                onSelect={() => onSelect(post._id)}
              >
                {/* {post.icon ? (
                  <p className='mr-2 text-[18px]'>{post.icon}</p>
                ) : (
                  <File className='mr-2 h-4 w-4' />
                )} */}
                <span>{post.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
