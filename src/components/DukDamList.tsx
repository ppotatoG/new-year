import { FC, useEffect, useState } from 'react';
import { db } from '@/firebase/firebaseClient';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import DukDamItem from './DukDamItem';

interface DukDam {
  id: string;
  content: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

const DukDamList: FC = () => {
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
    <ul>
      {dukdams.map(dukdam => (
        <DukDamItem key={dukdam.id} id={dukdam.id} content={dukdam.content} />
      ))}
    </ul>
  );
};

export default DukDamList;
