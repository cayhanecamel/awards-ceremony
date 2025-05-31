import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">🏆 表彰が見つかりません</h2>
        <p className="text-lg mb-8 text-gray-600">
          お探しの表彰は存在しないか、有効期限が切れています。
        </p>
        <Link 
          href="/" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
          トップページに戻る
        </Link>
      </div>
    </div>
  );
}
