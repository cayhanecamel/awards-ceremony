'use client';

import React, { useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { playDrumroll, stopDrumroll, playFanfare } from '../lib/audio';

interface SoundManagerProps {
  isPlaying: boolean;
  soundType: 'drumroll' | 'fanfare' | null;
}

export default function SoundManager({ isPlaying, soundType }: SoundManagerProps) {
  const drumrollPlayerRef = useRef<Tone.Player | null>(null);
  const fanfarePlayerRef = useRef<Tone.Player | null>(null);

  useEffect(() => {
    const initAudio = async () => {
      try {
        await Tone.start();
        console.log('オーディオコンテキスト初期化成功');
      } catch (error) {
        console.error('オーディオコンテキスト初期化エラー:', error);
      }
    };

    const handleUserInteraction = () => {
      initAudio();
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };

    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    const handleSound = async () => {
      if (soundType === 'drumroll') {
        if (isPlaying) {
          drumrollPlayerRef.current = await playDrumroll();
        } else {
          stopDrumroll(drumrollPlayerRef.current);
        }
      }
      
      if (soundType === 'fanfare' && isPlaying) {
        fanfarePlayerRef.current = await playFanfare();
      }
    };

    handleSound();

    return () => {
      if (drumrollPlayerRef.current) {
        stopDrumroll(drumrollPlayerRef.current);
      }
    };
  }, [isPlaying, soundType]);

  return null;
}
