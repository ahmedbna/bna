import { PostPage } from '@/components/post';
import { Metadata, ResolvingMetadata } from 'next';

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

export default function Post({ params }: { params: { id: string } }) {
  return (
    <div className='h-full'>
      <PostPage />
    </div>
  );
}
