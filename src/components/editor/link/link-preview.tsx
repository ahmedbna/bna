'use client';

import React, { useState, useEffect } from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { LinkModal } from './link-modal';
import { Spinner } from '@/components/spinner';

interface DataType {
  title?: string;
  description?: string;
  image?: string;
}

type Props = {
  link: string;
  handleLinkChange: (link: string) => void;
};

export const LinkPreview = ({ link, handleLinkChange }: Props) => {
  const [open, setOpen] = useState(false);
  const [previewData, setPreviewData] = useState<DataType | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!link) setOpen(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/link-preview`,
          {
            method: 'POST',
            body: JSON.stringify({ url: link }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching preview data: ${response.status}`);
        }

        const { previewData } = await response.json();
        setPreviewData(previewData);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch preview data');
      } finally {
        setIsLoading(false);
        setOpen(false);
      }
    };

    if (link) {
      fetchData();
    }
  }, [link]);

  if (isLoading) {
    return (
      <div className='w-full h-full'>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p>Something went wrong: {error}!</p>;
  }

  return (
    <div className='w-full'>
      {link ? (
        <HoverCard>
          <HoverCardTrigger asChild>
            <a
              href={link}
              target='_blank'
              rel='noopener noreferrer'
              className='w-full flex flex-col items-start justify-center gap-1'
            >
              {previewData?.image ? (
                <img
                  src={previewData?.image}
                  alt={previewData?.title ? previewData?.title : 'Link Preview'}
                  className='rounded-lg'
                />
              ) : (
                <h2>{previewData?.title ? previewData?.title : 'Link'}</h2>
              )}
            </a>
          </HoverCardTrigger>
          <HoverCardContent className='w-full max-w-5xl'>
            <div className='flex flex-col items-start justify-between gap-1'>
              <h2 className='font-semibold text-lg'>
                {previewData?.title ? previewData?.title : 'Link'}
              </h2>

              {previewData?.description ? (
                <p className='text-muted-foreground'>
                  {previewData?.description}
                </p>
              ) : null}
            </div>
            <div className='w-full flex items-center justify-center mt-6'>
              <LinkModal
                link={link}
                open={open}
                setOpen={setOpen}
                handleLinkChange={handleLinkChange}
              />
            </div>
          </HoverCardContent>
        </HoverCard>
      ) : (
        <LinkModal
          link={link}
          open={open}
          setOpen={setOpen}
          handleLinkChange={handleLinkChange}
        />
      )}
    </div>
  );
};
