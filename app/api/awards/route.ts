import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { generateSlug, calculateExpiryDate } from '../../../lib/utils';
import { Award } from '../../../lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.title || !body.winners || !Array.isArray(body.winners)) {
      return NextResponse.json(
        { error: '必須項目が不足しています' },
        { status: 400 }
      );
    }
    
    const slug = body.slug || generateSlug();
    
    const expiresAt = body.expires_at || calculateExpiryDate(30).toISOString();
    
    const awardData: Partial<Award> = {
      slug,
      title: body.title,
      description: body.description,
      winners: body.winners,
      expires_at: expiresAt,
      is_public: true,
    };
    
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { data, error } = await supabase
        .from('awards')
        .insert(awardData)
        .select()
        .single();
      
      if (error) throw error;
      
      return NextResponse.json({ 
        success: true, 
        data: { 
          slug: data.slug,
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/award/${data.slug}`
        } 
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      data: { 
        slug,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/award/${slug}`
      } 
    });
  } catch (error) {
    console.error('表彰作成エラー:', error);
    return NextResponse.json(
      { error: '表彰の作成中にエラーが発生しました' },
      { status: 500 }
    );
  }
}
