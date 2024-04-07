'use client';

import { useEffect, useState } from 'react';
import { useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/hooks/use-search';
import { useDebounce } from 'use-debounce';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { api } from '@/convex/_generated/api';

export const SearchCommand = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [search] = useDebounce(query, 500);
  const posts = useQuery(api.posts.searchPosts, {
    query: search,
  });

  const open = useSearch((store) => store.isOpen);
  const toggle = useSearch((store) => store.toggle);
  const onClose = useSearch((store) => store.onClose);

  const [isMounted, setIsMounted] = useState(false);
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
      <CommandDialog open={open} onOpenChange={onClose}>
        <CommandInput
          placeholder='Type to search posts...'
          onValueChange={(query) => setQuery(query)}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Suggested Posts'>
            {posts?.map((post) => (
              <CommandItem
                key={post._id}
                title={post.title}
                value={`${post._id}-${post.title}`}
                onSelect={() => onSelect(post._id)}
                className='cursor-pointer'
              >
                {post.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
