import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/firebaseClient';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

interface DukDam {
  id: string;
  content: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

const ViewDukDam: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [dukdam, setDukdam] = useState<DukDam | null>(null);

  useEffect(() => {
    if (!id || Array.isArray(id)) return;

    const fetchDukdam = async () => {
      const docRef = doc(db, 'dukdams', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setDukdam({ id: docSnap.id, ...docSnap.data() } as DukDam);
      } else {
        console.log('No such document!');
      }
    };
    fetchDukdam();
  }, [id]);

  if (!dukdam) return <div>Loading...</div>;

  return (
    (<div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">덕담 상세</h1>
      <p className="mb-4">{dukdam.content}</p>
      <Link href="/" className="px-4 py-2 bg-gray-500 text-white rounded">
        뒤로 가기
      </Link>
    </div>)
  );
};

export default ViewDukDam;
