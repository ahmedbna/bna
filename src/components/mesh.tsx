'use client';

import { useEffect, useRef } from 'react';
import randomColor from 'randomcolor';

type Props = {
  height?: number;
};

const Mesh = ({ height = 200 }: Props) => {
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

    // Generate random colors
    const color1 = randomColor();
    const color2 = randomColor();

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    // Fill canvas with gradient
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      height={height}
      className='rounded-lg shadow'
    ></canvas>
  );
};

export default Mesh;
