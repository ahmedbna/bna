import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href='/' className='flex items-center justify-center gap-x-2'>
      {/* <Image
        src="/logo.svg"
        height="40"
        width="40"
        alt="Logo"
        className="dark:hidden"
      />
      <Image
        src="/logo-dark.svg"
        height="40"
        width="40"
        alt="Logo"
        className="hidden dark:block"
      /> */}
      <p className='text-2xl'>{'🔥'}</p>
      <p className='text-2xl font-black '>BNA</p>
    </Link>
  );
};
