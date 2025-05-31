import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';
import { Award } from '../../../../lib/types';

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

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { data, error } = await supabase
        .from('awards')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          return NextResponse.json(
            { error: '表彰が見つかりません' },
            { status: 404 }
          );
        }
        throw error;
      }
      
      await supabase
        .from('awards')
        .update({ view_count: (data.view_count || 0) + 1 })
        .eq('id', data.id);
      
      return NextResponse.json({ data });
    }
    
    if (slug === 'test-award') {
      return NextResponse.json({ data: mockAward });
    }
    
    return NextResponse.json(
      { error: '表彰が見つかりません' },
      { status: 404 }
    );
  } catch (error) {
    console.error('表彰データ取得エラー:', error);
    return NextResponse.json(
      { error: '表彰データの取得中にエラーが発生しました' },
      { status: 500 }
    );
  }
}
