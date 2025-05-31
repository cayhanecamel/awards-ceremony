import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6 text-blue-800">🏆 表彰Webサービス</h1>
        
        <p className="text-lg mb-8 text-gray-700">
          入力内容に従って表彰画面を生成し、expire機能付きURLで共有できるインタラクティブWebサービス
        </p>
        
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3 text-blue-700">✨ 主要機能</h2>
            <ul className="text-left space-y-2 text-gray-600">
              <li>📝 入力画面: 表彰情報作成（SSG）</li>
              <li>🎭 表彰画面: インタラクティブ表彰発表（SPA）</li>
              <li>🔗 URL管理: 有効期限付きURL自動生成</li>
              <li>🎵 音響演出: ドラムロール・ファンファーレ付き</li>
              <li>🎉 視覚効果: 紙吹雪・光彩エフェクト</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3 text-blue-700">🎯 インタラクティブ発表</h2>
            <ul className="text-left space-y-2 text-gray-600">
              <li>1回目クリック: ドラムロール開始 🥁</li>
              <li>2回目クリック: 3位発表 + ドラムロール停止 🥉</li>
              <li>3回目クリック: ドラムロール開始 🥁</li>
              <li>4回目クリック: 2位発表 + ドラムロール停止 🥈</li>
              <li>5回目クリック: ドラムロール開始 🥁</li>
              <li>6回目クリック: 1位発表 + ファンファーレ + 紙吹雪 🥇🎉</li>
            </ul>
          </div>
        </div>
        
        <Link 
          href="/create" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
        >
          表彰を作成する
        </Link>
      </div>
    </main>
  );
}
