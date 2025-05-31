'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Award, Winner } from '../lib/types';
import { generateSlug, calculateExpiryDate } from '../lib/utils';
const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://example.supabase.co' 
  ? require('../lib/supabase').supabase 
  : null;

const formSchema = z.object({
  title: z.string().min(1, '表彰タイトルは必須です').max(255),
  description: z.string().optional(),
  winner1: z.string().min(1, '1位の受賞者名は必須です'),
  winner1Description: z.string().optional(),
  winner2: z.string().min(1, '2位の受賞者名は必須です'),
  winner2Description: z.string().optional(),
  winner3: z.string().min(1, '3位の受賞者名は必須です'),
  winner3Description: z.string().optional(),
  expiryDays: z.coerce.number().int().min(1).max(365).default(30),
});

export default function AwardForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      winner1: '',
      winner1Description: '',
      winner2: '',
      winner2Description: '',
      winner3: '',
      winner3Description: '',
      expiryDays: 30,
    },
  });

  const onSubmit = async (values: any) => {
    setIsSubmitting(true);
    setError(null);

    try {
      console.log('Form values:', values);
      
      router.push(`/award/test-award`);
    } catch (err) {
      console.error('表彰作成エラー:', err);
      setError('表彰の作成中にエラーが発生しました。もう一度お試しください。');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">表彰情報の作成</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium">
            表彰タイトル <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            {...form.register('title')}
            className="w-full p-2 border rounded-md"
            placeholder="例: 2025年度社内MVP表彰"
            defaultValue=""
          />
          {form.formState.errors.title && (
            <p className="text-red-500 text-sm">{form.formState.errors.title.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium">
            説明文
          </label>
          <textarea
            id="description"
            {...form.register('description')}
            className="w-full p-2 border rounded-md h-24"
            placeholder="表彰の説明や背景など"
            defaultValue=""
          />
        </div>
        
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-4">受賞者情報</h3>
          
          {/* 1位 */}
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <div className="flex items-center mb-2">
              <span className="text-amber-600 font-bold mr-2">🥇 1位</span>
            </div>
            <div className="space-y-2">
              <label htmlFor="winner1" className="block text-sm font-medium">
                受賞者名 <span className="text-red-500">*</span>
              </label>
              <input
                id="winner1"
                type="text"
                {...form.register('winner1')}
                className="w-full p-2 border rounded-md"
                placeholder="1位の受賞者名"
                defaultValue=""
              />
              {form.formState.errors.winner1 && (
                <p className="text-red-500 text-sm">{form.formState.errors.winner1.message}</p>
              )}
            </div>
            <div className="space-y-2 mt-2">
              <label htmlFor="winner1Description" className="block text-sm font-medium">
                受賞理由
              </label>
              <textarea
                id="winner1Description"
                {...form.register('winner1Description')}
                className="w-full p-2 border rounded-md h-16"
                placeholder="受賞理由や功績など"
                defaultValue=""
              />
            </div>
          </div>
          
          {/* 2位 */}
          <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
            <div className="flex items-center mb-2">
              <span className="text-gray-600 font-bold mr-2">🥈 2位</span>
            </div>
            <div className="space-y-2">
              <label htmlFor="winner2" className="block text-sm font-medium">
                受賞者名 <span className="text-red-500">*</span>
              </label>
              <input
                id="winner2"
                type="text"
                {...form.register('winner2')}
                className="w-full p-2 border rounded-md"
                placeholder="2位の受賞者名"
                defaultValue=""
              />
              {form.formState.errors.winner2 && (
                <p className="text-red-500 text-sm">{form.formState.errors.winner2.message}</p>
              )}
            </div>
            <div className="space-y-2 mt-2">
              <label htmlFor="winner2Description" className="block text-sm font-medium">
                受賞理由
              </label>
              <textarea
                id="winner2Description"
                {...form.register('winner2Description')}
                className="w-full p-2 border rounded-md h-16"
                placeholder="受賞理由や功績など"
                defaultValue=""
              />
            </div>
          </div>
          
          {/* 3位 */}
          <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-md">
            <div className="flex items-center mb-2">
              <span className="text-orange-600 font-bold mr-2">🥉 3位</span>
            </div>
            <div className="space-y-2">
              <label htmlFor="winner3" className="block text-sm font-medium">
                受賞者名 <span className="text-red-500">*</span>
              </label>
              <input
                id="winner3"
                type="text"
                {...form.register('winner3')}
                className="w-full p-2 border rounded-md"
                placeholder="3位の受賞者名"
                defaultValue=""
              />
              {form.formState.errors.winner3 && (
                <p className="text-red-500 text-sm">{form.formState.errors.winner3.message}</p>
              )}
            </div>
            <div className="space-y-2 mt-2">
              <label htmlFor="winner3Description" className="block text-sm font-medium">
                受賞理由
              </label>
              <textarea
                id="winner3Description"
                {...form.register('winner3Description')}
                className="w-full p-2 border rounded-md h-16"
                placeholder="受賞理由や功績など"
                defaultValue=""
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="expiryDays" className="block text-sm font-medium">
            有効期限（日数）
          </label>
          <input
            id="expiryDays"
            type="number"
            {...form.register('expiryDays', { valueAsNumber: true })}
            className="w-full p-2 border rounded-md"
            min="1"
            max="365"
            defaultValue="30"
          />
          <p className="text-sm text-gray-500">
            表彰URLの有効期限を設定します（1〜365日）
          </p>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md disabled:opacity-50"
        >
          {isSubmitting ? '作成中...' : '表彰を作成する'}
        </button>
      </form>
    </div>
  );
}
