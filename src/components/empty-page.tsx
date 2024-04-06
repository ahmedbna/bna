'use client';

import { ReactNode } from 'react';

type Props = {
  title: string;
  description: string;
  children?: ReactNode;
};

export default function EmptyPage({ title, description, children }: Props) {
  return (
    <div className='py-16 flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'>
      <div className='flex flex-col items-center gap-1 text-center'>
        <h3 className='text-2xl font-bold tracking-tight'>{title}</h3>
        <p className='text-sm text-muted-foreground mb-8'>{description}</p>
        {children}
      </div>
    </div>
  );
}
