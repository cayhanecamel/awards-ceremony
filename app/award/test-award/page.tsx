'use client';

import React from 'react';
import AwardReveal from '../../../components/AwardReveal';
import { Award } from '../../../lib/types';

export default function TestAwardPage() {
  const mockAward: Award = {
    id: 'test-id',
    slug: 'test-award',
    title: '2025年度社内MVP表彰',
    description: '今年度最も活躍したメンバーを表彰します',
    winners: [
      {
        rank: 1 as const,
        name: '鈴木一郎',
        description: '売上200%達成の功績',
      },
      {
        rank: 2 as const,
        name: '佐藤花子',
        description: '顧客満足度向上への貢献',
      },
      {
        rank: 3 as const,
        name: '山田太郎',
        description: '新規プロジェクトでの貢献',
      },
    ],
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    is_public: true,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <AwardReveal award={mockAward} />
    </div>
  );
}
