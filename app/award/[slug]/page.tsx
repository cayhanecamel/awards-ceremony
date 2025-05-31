import React from 'react';
import { notFound } from 'next/navigation';
import AwardReveal from '../../../components/AwardReveal';
import { supabase } from '../../../lib/supabase';
import { Award } from '../../../lib/types';

const mockAward: Award = {
  id: '1',
  slug: 'test-award',
  title: '2025年度社内MVP表彰',
  description: '今年度最も活躍したメンバーを表彰します',
  winners: [
    { rank: 3, name: '山田太郎', description: '新規プロジェクトでの貢献' },
    { rank: 2, name: '佐藤花子', description: '顧客満足度向上への貢献' },
    { rank: 1, name: '鈴木一郎', description: '売上200%達成の功績' },
  ]
};

export default async function AwardPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  let award: Award | null = null;

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { data, error } = await supabase
        .from('awards')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      award = data as Award;
    } else {
      if (slug === 'test-award') {
        award = mockAward;
      }
    }

    if (!award) {
      return notFound();
    }

    return (
      <main className="min-h-screen bg-gray-50">
        <AwardReveal award={award} />
      </main>
    );
  } catch (error) {
    console.error('表彰データ取得エラー:', error);
    return notFound();
  }
}
