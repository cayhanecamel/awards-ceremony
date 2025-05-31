'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface DrumrollEffectProps {
  isPlaying: boolean;
}

export default function DrumrollEffect({ isPlaying }: DrumrollEffectProps) {
  const [intensity, setIntensity] = useState(0);

  useEffect(() => {
    if (!isPlaying) {
      setIntensity(0);
      return;
    }

    const interval = setInterval(() => {
      setIntensity(Math.random() * 5 + 1);
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!isPlaying) return null;

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none"
      animate={{
        x: [0, intensity, -intensity, 0],
        y: [0, intensity / 2, -intensity / 2, 0],
      }}
      transition={{
        duration: 0.1,
        repeat: Infinity,
        repeatType: 'loop',
      }}
    />
  );
}
