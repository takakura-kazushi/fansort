import { collection, addDoc, getDocs, query, orderBy, Timestamp, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

/**
 * 診断結果から一意のドキュメントIDを生成（簡易ハッシュ）
 */
function generateDiagnosisId(userId: string, answers: string[], hobbyName: string): string {
  const source = `${userId}:${answers.join(',')}:${hobbyName}`;
  // 簡易的なハッシュ（実環境ではcrypto.subtle.digestなどを推奨）
  let hash = 0;
  for (let i = 0; i < source.length; i++) {
    const char = source.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 32bit整数に変換
  }
  return `diag_${Math.abs(hash).toString(36)}`;
}

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
 * 診断結果をFirestoreに保存（冪等性あり）
 * 同じ診断内容なら同じドキュメントIDで上書きされるため重複しない
 */
export async function saveDiagnosisResult(
  userId: string,
  result: Omit<DiagnosisResult, 'diagnosedAt'>
): Promise<string> {
  try {
    const docId = generateDiagnosisId(userId, result.answers, result.hobbyName);
    const diagnosisDocRef = doc(db, 'users', userId, 'diagnosisHistory', docId);
    
    // 既存チェック：既に同じ診断が保存されている場合はスキップ
    const existingDoc = await getDoc(diagnosisDocRef);
    if (existingDoc.exists()) {
      console.log('Diagnosis already saved, skipping duplicate save');
      return docId;
    }

    await setDoc(diagnosisDocRef, {
      ...result,
      diagnosedAt: Timestamp.now(),
    });

    return docId;
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