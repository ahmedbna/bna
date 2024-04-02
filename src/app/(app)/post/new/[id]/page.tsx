'use client';
import { Editor } from '@/components/editor';

export default function Post() {
  const handleChangeContent = (content: string) => {
    console.log(content);
  };

  return (
    <div className='h-full min-h-16 flex justify-center '>
      <Editor handleChangeContent={handleChangeContent} />
    </div>
  );
}
