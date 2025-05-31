'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ConfettiProps {
  isActive: boolean;
}

const ConfettiPiece = ({ color, x, delay }: { color: string; x: number; delay: number }) => {
  return (
    <motion.div
      className="absolute top-0 w-2 h-3 rounded-sm"
      style={{ 
        backgroundColor: color,
        left: `${x}%`,
      }}
      initial={{ y: -20, opacity: 0, rotate: 0 }}
      animate={{ 
        y: ['0vh', '100vh'],
        opacity: [0, 1, 1, 0],
        rotate: [0, 360],
      }}
      transition={{
        duration: Math.random() * 2 + 3,
        delay: delay,
        ease: 'easeInOut',
      }}
    />
  );
};

export default function ConfettiEffect({ isActive }: ConfettiProps) {
  const [pieces, setPieces] = useState<React.ReactNode[]>([]);
  
  useEffect(() => {
    if (!isActive) {
      setPieces([]);
      return;
    }
    
    const colors = ['#FFD700', '#FF6347', '#4169E1', '#32CD32', '#FF69B4', '#9370DB'];
    const newPieces = [];
    
    for (let i = 0; i < 100; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const x = Math.random() * 100;
      const delay = Math.random() * 0.5;
      
      newPieces.push(
        <ConfettiPiece 
          key={i} 
          color={color} 
          x={x} 
          delay={delay} 
        />
      );
    }
    
    setPieces(newPieces);
  }, [isActive]);
  
  if (!isActive || pieces.length === 0) return null;
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {pieces}
    </div>
  );
}
