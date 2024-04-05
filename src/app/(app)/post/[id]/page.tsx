'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import PostAuthor from '@/components/post/post-author';
import PostHeader from '@/components/post/post-header';
import { Spinner } from '@/components/spinner';
import { initialContent } from '@/lib/initial-content';
import { useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import { Alert } from '@/components/ui/alert';

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
  const Editor = useMemo(
    () => dynamic(() => import('@/components/editor'), { ssr: false }),
    []
  );

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

  return (
    <div className='w-full dark:bg-[#1f1f1f] min-h-screen flex flex-col gap-4 relative'>
      <PostHeader isDraft={false} post={post} />

      <Editor
        editable={false}
        initialContent={post.content || initialContent}
        handleChangeContent={() => null}
      />

      <div className='fixed bottom-0 right-0 flex justify-center mr-2 mb-2'>
        <div className='w-full max-w-[800px]'>
          <Alert>
            <PostAuthor post={post} />
          </Alert>
        </div>
      </div>
    </div>
  );
}
