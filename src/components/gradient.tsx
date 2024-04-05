'use client';

import { useEffect, useRef } from 'react';

type Props = {
  color1: string;
  color2: string;
  className?: string;
  height?: number;
};

const Gradient = ({ color1, color2, height = 200, className }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set width to 100% of the parent element
    canvas.style.width = '100%';
    const width = canvas.offsetWidth; // Get actual width after applying CSS

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const height = canvas.height; // No change to height

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    // Fill canvas with gradient
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }, []);

  return (
    <canvas ref={canvasRef} height={height} className={className}></canvas>
  );
};

export default Gradient;
