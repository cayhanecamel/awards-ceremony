'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Winner } from '../lib/types';
import DrumrollEffect from './DrumrollEffect';
import ConfettiEffect from './ConfettiEffect';
import SoundManager from './SoundManager';

interface AwardRevealProps {
  award: Award;
}

export default function AwardReveal({ award }: AwardRevealProps) {
  const [clickCount, setClickCount] = useState(0);
  const [revealedRanks, setRevealedRanks] = useState<number[]>([]);
  const [isDrumrollPlaying, setIsDrumrollPlaying] = useState(false);
  const [isFanfarePlaying, setIsFanfarePlaying] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const sortedWinners = [...award.winners].sort((a, b) => a.rank - b.rank);

  const handleClick = () => {
    const newClickCount = clickCount + 1;
    console.log('クリック検知: カウント', newClickCount);
    alert(`クリック検知: ${newClickCount}回目のクリック`);
    setClickCount(newClickCount);

    switch (newClickCount) {
      case 1: // 1回目: ドラムロール開始
        console.log('ドラムロール開始');
        setIsDrumrollPlaying(true);
        break;
      case 2: // 2回目: 3位発表
        console.log('3位発表');
        setIsDrumrollPlaying(false);
        setRevealedRanks([...revealedRanks, 3]);
        break;
      case 3: // 3回目: ドラムロール開始
        console.log('ドラムロール開始 (2回目)');
        setIsDrumrollPlaying(true);
        break;
      case 4: // 4回目: 2位発表
        console.log('2位発表');
        setIsDrumrollPlaying(false);
        setRevealedRanks([...revealedRanks, 2]);
        break;
      case 5: // 5回目: ドラムロール開始
        console.log('ドラムロール開始 (3回目)');
        setIsDrumrollPlaying(true);
        break;
      case 6: // 6回目: 1位発表 + ファンファーレ + 紙吹雪
        console.log('1位発表 + エフェクト');
        setIsDrumrollPlaying(false);
        setIsFanfarePlaying(true);
        setRevealedRanks([...revealedRanks, 1]);
        setShowConfetti(true);
        break;
      default:
        break;
    }
  };

  const getCardStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-amber-300 to-yellow-500 shadow-xl scale-110";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-400 shadow-lg scale-105";
      case 3:
        return "bg-gradient-to-r from-amber-700 to-amber-600 shadow-md";
      default:
        return "bg-white";
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return "👑";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return "";
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-6 cursor-pointer"
      onClick={clickCount < 6 ? handleClick : undefined}
    >
      {/* 表彰タイトル */}
      <motion.h1 
        className="text-3xl md:text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {award.title}
      </motion.h1>
      
      {/* 説明文 */}
      {award.description && (
        <motion.p 
          className="text-lg text-gray-600 mb-12 text-center max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {award.description}
        </motion.p>
      )}
      
      {/* 受賞者カード */}
      <div className="w-full max-w-3xl space-y-6 mb-8">
        <AnimatePresence>
          {sortedWinners.map((winner) => (
            revealedRanks.includes(winner.rank) && (
              <motion.div
                key={winner.rank}
                className={`p-6 rounded-lg text-white ${getCardStyle(winner.rank)}`}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">{getRankIcon(winner.rank)}</span>
                  <span className="text-xl font-bold">{winner.rank}位</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{winner.name}</h3>
                {winner.description && (
                  <p className="text-sm md:text-base opacity-90">{winner.description}</p>
                )}
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
      
      {/* 初期案内メッセージ */}
      {clickCount === 0 && (
        <motion.div 
          className="text-center text-black text-xl font-bold bg-yellow-100 p-4 rounded-lg shadow-md animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          クリックして表彰を開始
        </motion.div>
      )}
      
      {/* 効果コンポーネント */}
      <DrumrollEffect isPlaying={isDrumrollPlaying} />
      <ConfettiEffect isActive={showConfetti} />
      <SoundManager 
        isPlaying={isDrumrollPlaying || isFanfarePlaying} 
        soundType={isDrumrollPlaying ? 'drumroll' : (isFanfarePlaying ? 'fanfare' : null)} 
      />
    </div>
  );
}
