'use client';

import PostAuthor from '@/components/post/post-author';
import PostHeader from '@/components/post/post-header';
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { initialContent } from '@/lib/initial-content';
import { useUser } from '@clerk/clerk-react';
import { useMutation, useQuery } from 'convex/react';
import { Metadata, ResolvingMetadata } from 'next';
import dynamic from 'next/dynamic';
import { redirect, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { api } from '../../../../../convex/_generated/api';
import { toast } from 'sonner';
import { Id } from '../../../../../convex/_generated/dataModel';

// type Props = {
//   params: { id: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// };

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const packageData: { package: PackageType } = await getPackageById(params.id);

//   if (!packageData) {
//     return {
//       title: 'Package page!',
//       description: 'Package page is not found',
//     };
//   }

//   return {
//     title: packageData.package.name,
//     description: packageData.package.description,
//     alternates: {
//       canonical: `/package/${packageData.package.name}`,
//     },
//     openGraph: {
//       title: packageData.package.name,
//       description: packageData.package.description,
//       url: `https://xadapp.com/package/${params.id}`,
//       siteName: packageData.package.name,
//       images: packageData.package.images.map((image) => ({
//         url: image.secure_url,
//         width: image.width,
//         height: image.height,
//       })),
//       locale: 'en_US',
//       type: 'website',
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: packageData.package.name,
//       description: packageData.package.description,
//       images: packageData.package.images.map((image) => ({
//         url: image.secure_url,
//         width: image.width,
//         height: image.height,
//       })),
//     },
//   };
// }

interface Props {
  params: {
    id: Id<'posts'>;
  };
}

export default function Post({ params }: Props) {
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const Editor = useMemo(
    () => dynamic(() => import('@/components/editor'), { ssr: false }),
    []
  );

  const update = useMutation(api.posts.update);
  const post = useQuery(api.posts.getPostById, {
    postId: params.id,
  });

  if (post === undefined) {
    return (
      <div className='h-full flex items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }
  if (post === null) {
    return <div>Not found</div>;
  }

  const handleDraftPost = () => {
    if (user?.id !== post.userId) return;

    setLoading(true);

    const promise = update({
      id: params.id,
      isPublished: false,
    });

    toast.promise(promise, {
      loading: 'Drafting post...',
      success: 'Post Drafted!',
      error: 'Something went wrong',
    });

    promise
      .then((postId) => {
        if (postId) router.push(`/me/draft/${postId}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <PostAuthor post={post} />

      <div className='dark:bg-[#1f1f1f] min-h-full flex flex-col gap-4 relative'>
        <PostHeader isDraft={false} post={post} />

        <Editor
          editable={false}
          initialContent={post.content || initialContent}
          handleChangeContent={() => null}
        />

        {user?.id === post.userId ? (
          <div className='w-full flex items-center p-6'>
            <Button
              className='w-full'
              size='lg'
              variant='default'
              disabled={loading}
              onClick={handleDraftPost}
            >
              {loading ? <Spinner /> : 'Draft Post'}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
