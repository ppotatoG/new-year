import { useState, FormEvent } from 'react';
import { db } from '@/firebase/firebaseClient';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';

const Write: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (content.trim() === '') return;

    try {
      await addDoc(collection(db, 'dukdams'), {
        content,
        createdAt: serverTimestamp(),
      });
      router.push('/');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">덕담 작성하기</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="당신의 덕담을 입력하세요..."
          rows={5}
          required
        ></textarea>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          작성 완료
        </button>
      </form>
    </div>
  );
};

export default Write;
