import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  query, 
  orderBy, 
  Timestamp,
  setDoc,
  writeBatch
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { QuestPreset } from '@/data/questPresets';

export interface UserQuest {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  tips: string[];
  status: 'incomplete' | 'complete';
  order: number;
  isPreset: boolean; // プリセットかカスタムか
  createdAt: Date;
  completedAt?: Date;
}

// マイ趣味情報
export interface MyHobby {
  userId: string;
  hobbyId: string;
  hobbyName: string;
  hobbyEmoji: string;
  setAt: Date;
}

/**
 * マイ趣味を設定/更新
 */
export async function setMyHobby(
  userId: string,
  hobbyId: string,
  hobbyName: string,
  hobbyEmoji: string
): Promise<void> {
  const ref = doc(db, 'userHobbies', userId);
  await setDoc(ref, {
    userId,
    hobbyId,
    hobbyName,
    hobbyEmoji,
    setAt: Timestamp.now(),
  });
}

/**
 * マイ趣味を取得
 */
export async function getMyHobby(userId: string): Promise<MyHobby | null> {
  try {
    const ref = doc(db, 'userHobbies', userId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    const data = snap.data();
    return {
      userId: data.userId,
      hobbyId: data.hobbyId,
      hobbyName: data.hobbyName,
      hobbyEmoji: data.hobbyEmoji,
      setAt: data.setAt?.toDate?.() || new Date(),
    };
  } catch (error) {
    console.error('Error getting my hobby:', error);
    throw error;
  }
}

/**
 * プリセットクエストをユーザーに追加
 */
export async function addPresetQuestsToUser(
  userId: string,
  hobbyId: string,
  presetQuests: QuestPreset[]
): Promise<void> {
  try {
    const questsRef = collection(db, 'users', userId, 'quests');
    
    // 既存のクエストをチェック
    const existingQuests = await getDocs(questsRef);
    if (existingQuests.size > 0) {
      console.log('Quests already exist for this user');
      return;
    }

    // プリセットクエストを一括追加
    const promises = presetQuests.map(quest => 
      addDoc(questsRef, {
        title: quest.title,
        description: quest.description,
        difficulty: quest.difficulty,
        estimatedTime: quest.estimatedTime,
        tips: quest.tips,
        status: 'incomplete',
        order: quest.order,
        isPreset: true,
        createdAt: Timestamp.now(),
        hobbyId: hobbyId,
      })
    );

    await Promise.all(promises);
    console.log('Preset quests added successfully');
  } catch (error) {
    console.error('Error adding preset quests:', error);
    throw error;
  }
}

/**
 * カスタムクエストを追加
 */
export async function addCustomQuest(
  userId: string,
  hobbyId: string,
  title: string,
  description: string
): Promise<string> {
  try {
    const questsRef = collection(db, 'users', userId, 'quests');
    
    // 現在の最大order値を取得
    const existingQuests = await getDocs(query(questsRef, orderBy('order', 'desc')));
    const maxOrder = existingQuests.empty ? 0 : existingQuests.docs[0].data().order;

    const docRef = await addDoc(questsRef, {
      title,
      description,
      difficulty: 'beginner',
      estimatedTime: '未設定',
      tips: [],
      status: 'incomplete',
      order: maxOrder + 1,
      isPreset: false,
      createdAt: Timestamp.now(),
      hobbyId: hobbyId,
    });

    return docRef.id;
  } catch (error) {
    console.error('Error adding custom quest:', error);
    throw error;
  }
}

/**
 * ユーザーのクエスト一覧を取得
 */
export async function getUserQuests(userId: string): Promise<UserQuest[]> {
  try {
    const questsRef = collection(db, 'users', userId, 'quests');
    const q = query(questsRef, orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);

    const quests: UserQuest[] = [];
    querySnapshot.forEach(doc => {
      const data = doc.data();
      quests.push({
        id: doc.id,
        title: data.title,
        description: data.description,
        difficulty: data.difficulty,
        estimatedTime: data.estimatedTime,
        tips: data.tips || [],
        status: data.status,
        order: data.order,
        isPreset: data.isPreset,
        createdAt: data.createdAt.toDate(),
        completedAt: data.completedAt ? data.completedAt.toDate() : undefined,
      });
    });

    return quests;
  } catch (error) {
    console.error('Error getting user quests:', error);
    throw error;
  }
}

/**
 * クエストのステータスを更新
 */
export async function updateQuestStatus(
  userId: string,
  questId: string,
  status: 'incomplete' | 'complete'
): Promise<void> {
  try {
    const questRef = doc(db, 'users', userId, 'quests', questId);
    
    const updateData: Record<string, unknown> = { status };
    if (status === 'complete') {
      updateData.completedAt = Timestamp.now();
    } else {
      updateData.completedAt = null;
    }

    await updateDoc(questRef, updateData);
  } catch (error) {
    console.error('Error updating quest status:', error);
    throw error;
  }
}

/**
 * 次のおすすめクエストを取得
 */
export async function getNextRecommendedQuest(userId: string): Promise<UserQuest | null> {
  try {
    const quests = await getUserQuests(userId);
    
    // 未完了のクエストの中で最も order が小さいものを返す
    const incompleteQuests = quests.filter(q => q.status === 'incomplete');
    
    if (incompleteQuests.length === 0) {
      return null;
    }

    return incompleteQuests[0];
  } catch (error) {
    console.error('Error getting next recommended quest:', error);
    throw error;
  }
}

/**
 * 既存のユーザークエストを全削除
 */
export async function clearUserQuests(userId: string): Promise<void> {
  const questsRef = collection(db, 'users', userId, 'quests');
  const snapshot = await getDocs(questsRef);
  if (snapshot.empty) return;

  // writeBatch は500件まで。想定件数は少数だが念のため分割対応。
  let batch = writeBatch(db);
  let opCount = 0;
  for (const docSnap of snapshot.docs) {
    batch.delete(docSnap.ref);
    opCount++;
    if (opCount === 450) { // 余裕を持ってロールオーバー
      await batch.commit();
      batch = writeBatch(db);
      opCount = 0;
    }
  }
  await batch.commit();
}