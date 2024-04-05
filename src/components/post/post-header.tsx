'use client';

import Image from 'next/image';
import { ElementRef, useRef, useState } from 'react';
import { Doc } from '../../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import TextareaAutosize from 'react-textarea-autosize';

import { api } from '../../../convex/_generated/api';
import { UploadImage } from '../upload-image';
import Gradient from '../gradient';

interface Props {
  isDraft: boolean;
  post: Doc<'posts'>;
}

export default function PostHeader({ isDraft = false, post }: Props) {
  const inputRef = useRef<ElementRef<'textarea'>>(null);
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(post.title);
  const updateTitle = useMutation(api.posts.update);

  const enableInput = () => {
    if (!isDraft) return;

    setEditingTitle(true);
    setTimeout(() => {
      setTitleValue(post.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setEditingTitle(false);

  const onInput = (titleValue: string) => {
    setTitleValue(titleValue);
    updateTitle({
      id: post._id,
      title: titleValue || 'Untitled',
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      disableInput();
    }
  };

  return (
    <div className='w-full'>
      {isDraft && post.imageUrl === undefined ? (
        <UploadImage postId={post._id} />
      ) : !post.imageUrl ? (
        <Gradient color1={post.color1} color2={post.color2} height={110} />
      ) : (
        <Image
          src={post.imageUrl!}
          width={1000}
          height={400}
          alt='Picture of the author'
          className='w-full max-h-[380px]'
          layout='responsive'
        />
      )}

      <div className='px-[54px] flex flex-col gap-4 mt-8'>
        {editingTitle && isDraft ? (
          <TextareaAutosize
            ref={inputRef}
            onBlur={disableInput}
            onKeyDown={onKeyDown}
            value={titleValue}
            onChange={(e) => onInput(e.target.value)}
            className='text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none'
          />
        ) : (
          <h1
            onClick={enableInput}
            className='h-[53px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]'
          >
            {post.title}
          </h1>
        )}

        {/* <p className='text-[#cfcfcf]'>{post.excerpt}</p> */}
        {/* <Emoji onChange={() => {}}>
          <p className='text-6xl'>{'🤔'}</p>
        </Emoji> */}
      </div>
    </div>
  );
}
