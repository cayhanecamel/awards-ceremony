import React from 'react';
import AwardForm from '../../components/AwardForm';

export default function CreatePage() {
  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">表彰作成</h1>
        <AwardForm />
      </div>
    </main>
  );
}
