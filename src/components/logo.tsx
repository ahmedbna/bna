import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href='/' className='hidden md:flex items-center gap-x-2'>
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
      <p className='font-semibold'>Qalam</p>
    </Link>
  );
};
