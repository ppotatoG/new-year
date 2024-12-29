import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/firebase/firebaseClient';
import { doc, deleteDoc } from 'firebase/firestore';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    res.status(400).json({ error: '유효한 덕담 ID를 입력하세요.' });
    return;
  }

  if (req.method === 'DELETE') {
    try {
      await deleteDoc(doc(db, 'dukdams', id));
      res.status(200).json({ message: '덕담 삭제 성공' });
    } catch (error) {
      res.status(500).json({ error: '덕담 삭제에 실패했습니다.' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
