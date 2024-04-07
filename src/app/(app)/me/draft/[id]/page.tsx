'use client';

import { Id } from '@/convex/_generated/dataModel';
import { PostPage } from '@/components/post/poat-page';

interface Props {
  params: {
    id: Id<'posts'>;
  };
}

export default function Draft({ params }: Props) {
  return <PostPage postId={params.id} isDraft={true} editable={true} />;
}
