import { fetchQuery } from 'convex/nextjs';
import { Metadata, ResolvingMetadata } from 'next';
import { PostPage } from '@/components/post/poat-page';
import { Id } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';
import { Block } from '@blocknote/core';
import { getAuthToken } from '@/providers/token';

type Props = {
  params: {
    id: Id<'posts'>;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const token = await getAuthToken();
//   const post = await fetchQuery(
//     api.posts.getPostById,
//     { postId: params.id },
//     { token }
//   );

//   if (!post) {
//     return {
//       title: 'Post!',
//       description: 'Post is not found!',
//     };
//   }

//   const content = JSON.parse(post.content || '[]');
//   const excerpt = content.filter(
//     (block: Block) => block.type === 'paragraph' && block.content?.length
//   )[0]?.content?.[0]?.text;

//   return {
//     title: post.title,
//     description: excerpt,
//     alternates: {
//       canonical: `/package/${post.title}`,
//     },
//     openGraph: {
//       title: post.title,
//       description: excerpt,
//       url: `${process.env.NEXT_PUBLIC_APP_URL}/${params.id}`,
//       siteName: post.title,
//       images: [
//         {
//           url: post.coverImage as URL | string,
//           // width: image.width,
//           // height: image.height,
//         },
//       ],
//       locale: 'en_US',
//       type: 'website',
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: post.title,
//       description: excerpt,
//       images: [
//         {
//           url: post.coverImage as URL | string,
//           // width: image.width,
//           // height: image.height,
//         },
//       ],
//     },
//   };
// }

export default function Post({ params }: Props) {
  return <PostPage postId={params.id} isDraft={false} editable={false} />;
}
