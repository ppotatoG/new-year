import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/firebase/firebaseClient';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

interface DukDam {
  id: string;
  content: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dukdamsRef = collection(db, 'dukdams');

  if (req.method === 'GET') {
    try {
      const querySnapshot = await getDocs(dukdamsRef);
      const dukdams: DukDam[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as DukDam[];
      res.status(200).json(dukdams);
    } catch (error) {
      res.status(500).json({ error: '덕담을 가져오는 데 실패했습니다.' });
    }
  } else if (req.method === 'POST') {
    const { content } = req.body;
    if (!content || typeof content !== 'string') {
      res.status(400).json({ error: '유효한 덕담 내용을 입력하세요.' });
      return;
    }

    try {
      const newDukdam = await addDoc(dukdamsRef, {
        content,
        createdAt: serverTimestamp(),
      });
      res.status(201).json({ id: newDukdam.id });
    } catch (error) {
      res.status(500).json({ error: '덕담을 추가하는 데 실패했습니다.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
