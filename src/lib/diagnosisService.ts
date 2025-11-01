import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface DiagnosisResult {
  hobbyName: string;
  hobbyEmoji: string;
  score: number;
  answers: string[];
  diagnosedAt: Date;
  resultData?: {
    difficulty: string;
    cost: string;
    highlights: string[];
    description: string;
  };
}

export interface SavedDiagnosisHistory extends DiagnosisResult {
  id: string;
}

/**
 * 診断結果をFirestoreに保存
 */
export async function saveDiagnosisResult(
  userId: string,
  result: Omit<DiagnosisResult, 'diagnosedAt'>
): Promise<string> {
  try {
    const diagnosisHistoryRef = collection(db, 'users', userId, 'diagnosisHistory');
    
    const docRef = await addDoc(diagnosisHistoryRef, {
      ...result,
      diagnosedAt: Timestamp.now(),
    });

    return docRef.id;
  } catch (error) {
    console.error('Error saving diagnosis result:', error);
    throw error;
  }
}

/**
 * ユーザーの診断履歴を取得
 */
export async function getDiagnosisHistory(userId: string): Promise<SavedDiagnosisHistory[]> {
  try {
    const diagnosisHistoryRef = collection(db, 'users', userId, 'diagnosisHistory');
    const q = query(diagnosisHistoryRef, orderBy('diagnosedAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    
    const history: SavedDiagnosisHistory[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      history.push({
        id: doc.id,
        hobbyName: data.hobbyName,
        hobbyEmoji: data.hobbyEmoji,
        score: data.score,
        answers: data.answers,
        diagnosedAt: data.diagnosedAt.toDate(),
        resultData: data.resultData,
      });
    });

    return history;
  } catch (error) {
    console.error('Error getting diagnosis history:', error);
    throw error;
  }
}