import { useEffect, useState } from 'react';
import { db } from '@/firebase/firebaseClient';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';

interface DukDam {
  id: string;
  content: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

const Home: React.FC = () => {
  const [dukdams, setDukdams] = useState<DukDam[]>([]);

  useEffect(() => {
    const fetchDukdams = async () => {
      const q = query(collection(db, 'dukdams'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as DukDam[];
      setDukdams(data);
    };
    fetchDukdams();
  }, []);

  return (
    (<div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">덕담 목록</h1>
      <Link
        href="/write"
        className="mb-4 inline-block px-4 py-2 bg-green-500 text-white rounded">
      
        덕담 작성하기
      
    </Link>
      <ul>
        {dukdams.map(dukdam => (
          <li key={dukdam.id} className="mb-2 p-2 border rounded">
            <Link href={`/view/${dukdam.id}`} className="text-blue-600">
              {dukdam.content}
            </Link>
          </li>
        ))}
      </ul>
    </div>)
  );
};

export default Home;
