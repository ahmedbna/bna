'use client';

import { useMemo, useState, useCallback, useRef } from 'react';
import { useWavesurfer } from '@wavesurfer/react';
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js';
import Hover from 'wavesurfer.js/dist/plugins/hover.esm.js';
import { useTheme } from 'next-themes';
import { Pause, Play } from 'lucide-react';
import { Button } from '../ui/button';

const formatTime = (seconds: any) =>
  [seconds / 60, seconds % 60]
    .map((v) => `0${Math.floor(v)}`.slice(-2))
    .join(':');

type Props = {
  audioUrl: string;
};
export const AudioPlayer = ({ audioUrl }: Props) => {
  const { resolvedTheme } = useTheme();
  const containerRef = useRef(null);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 100,
    waveColor: 'red',
    progressColor: '#5e5e5e',
    cursorColor: '#ddd5e9',
    cursorWidth: 2,
    barWidth: 5,
    barGap: 4,
    barRadius: 20,
    url: audioUrl,
    plugins: useMemo(
      () => [
        // Timeline.create(),
        Hover.create({
          lineWidth: 1,
          lineColor: '#5e5e5e',
          labelBackground: '#5e5e5e',
          labelColor: '#fff',
          labelSize: '11px',
        }),
      ],
      []
    ),
  });

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  return (
    <div className='flex items-center gap-4'>
      <div ref={containerRef} className='flex-1' />

      <p>{formatTime(currentTime)}</p>
      <div className='flex flex-col gap-2'>
        <Button
          // variant='outline'
          onClick={onPlayPause}
          className='rounded-full h-12 w-12'
        >
          {isPlaying ? (
            <Pause className='h-6 w-6' />
          ) : (
            <Play className='h-6 w-6' />
          )}
          {/* {isPlaying ? 'Pause' : 'Play'} */}
        </Button>
      </div>
    </div>
  );
};
