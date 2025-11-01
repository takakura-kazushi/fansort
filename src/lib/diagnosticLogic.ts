import { HobbyData, HobbyProfile } from "@/data/hobbies";

// ユーザーの回答から生成されるプロフィール
export interface UserProfile {
  activeLevel: number;
  socialLevel: number;
  creativityLevel: number;
  learningLevel: number;
  indoorLevel: number;
  costLevel: number;
  timeFlexibility: number;
  soloFriendly: number;
}

// 回答値とプロフィールパラメータのマッピング
const answerToProfileMapping: {
  [key: string]: Partial<UserProfile>;
} = {
  // 質問1: 休日の理想的な過ごし方
  active: { activeLevel: 3, indoorLevel: -2, soloFriendly: 2 },
  indoor: { indoorLevel: 3, activeLevel: -2, soloFriendly: 2 },
  social: { socialLevel: 3, soloFriendly: -2, activeLevel: 1 },
  learning: { learningLevel: 3, indoorLevel: 2, activeLevel: -1 },

  // 質問2: どんな瞬間にワクワクしますか
  creative: { creativityLevel: 3, soloFriendly: 1, indoorLevel: 1 },
  achievement: { activeLevel: 1, learningLevel: 2 },
  discovery: { learningLevel: 2, creativityLevel: 1, indoorLevel: 1 },
  empathy: { socialLevel: 3, soloFriendly: -1, indoorLevel: 1 },

  // 質問3: 時間とお金があったら
  adventure: { activeLevel: 2, indoorLevel: -2, costLevel: 1 },
  collecting: { creativityLevel: 2, costLevel: 2, indoorLevel: 2, activeLevel: -1 },
  skill: { learningLevel: 3, costLevel: 1, indoorLevel: 1 },
  comfort: { indoorLevel: 3, soloFriendly: 2, activeLevel: -2 },

  // 質問4: ストレス解消法
  physical: { activeLevel: 3, indoorLevel: -2 },
  immersion: { creativityLevel: 2, soloFriendly: 2, indoorLevel: 2, activeLevel: -1 },
  nature: { indoorLevel: -2, activeLevel: 1, soloFriendly: 1 },
  food: { creativityLevel: 2, socialLevel: 1, indoorLevel: 2, activeLevel: -1 },

  // 質問5: 継続のモチベーション
  growth: { learningLevel: 2, activeLevel: 1 },
  fun: { creativityLevel: 2, timeFlexibility: 1, indoorLevel: 1 },
  connection: { socialLevel: 3, soloFriendly: -2 },
  tangible: { creativityLevel: 2, soloFriendly: 1, indoorLevel: 1 },

  // 質問6: 普段の生活で大切にしていること
  health: { activeLevel: 2, learningLevel: 1 },
  expression: { creativityLevel: 3, socialLevel: 1, indoorLevel: 1 },
  efficiency: { learningLevel: 2, timeFlexibility: -1, indoorLevel: 1 },
  fulfillment: { creativityLevel: 1, soloFriendly: 1, indoorLevel: 1 },

  // 質問7: 新しいことを始めるとき
  cost: { costLevel: -3, timeFlexibility: 1, indoorLevel: 1 },
  accessibility: { timeFlexibility: 2, costLevel: -1, indoorLevel: 1 },
  practicality: { learningLevel: 2, costLevel: 1 },
  interest: { creativityLevel: 2, learningLevel: 1, indoorLevel: 1 },

  // 質問8: 理想的な学習スタイル
  practice: { activeLevel: 1, learningLevel: 1 },
  theory: { learningLevel: 3, indoorLevel: 3, activeLevel: -2 },
  guided: { socialLevel: 2, soloFriendly: -1 },
  "self-paced": { soloFriendly: 3, timeFlexibility: 2, indoorLevel: 2, activeLevel: -1 },

  // 質問9: 達成感を感じるとき
  challenge: { learningLevel: 2, activeLevel: 1 },
  accumulation: { soloFriendly: 2, learningLevel: 1, indoorLevel: 1, activeLevel: -1 },
  recognition: { socialLevel: 3, creativityLevel: 1 },
  transformation: { learningLevel: 2, creativityLevel: 1, indoorLevel: 1 },

  // 質問10: 趣味を通して得たいもの
  enjoyment: { creativityLevel: 2, timeFlexibility: 1 },
  relationships: { socialLevel: 3, soloFriendly: -2, activeLevel: 1 },
  skills: { learningLevel: 3, costLevel: 1, indoorLevel: 1 },
  refresh: { activeLevel: -1, indoorLevel: 2, soloFriendly: 1 },

  // 質問11: あなたの性格
  adventurous: { activeLevel: 3, indoorLevel: -2, costLevel: 1 },
  methodical: { learningLevel: 2, soloFriendly: 2, indoorLevel: 2, activeLevel: -1 },
  sociable: { socialLevel: 3, soloFriendly: -2, activeLevel: 1 },
  introspective: { soloFriendly: 3, indoorLevel: 3, activeLevel: -2 },

  // 質問12: 週末に時間ができたら
  explore: { activeLevel: 2, indoorLevel: -2, creativityLevel: 1 },
  focused: { creativityLevel: 2, soloFriendly: 2, indoorLevel: 2, activeLevel: -1 },
  together: { socialLevel: 3, soloFriendly: -2, activeLevel: 1 },
  relax: { indoorLevel: 3, activeLevel: -2, soloFriendly: 1 },

  // 質問13: 自分の強み
  athletic: { activeLevel: 3, indoorLevel: -2 },
  imaginative: { creativityLevel: 3, learningLevel: 1, indoorLevel: 2, activeLevel: -1 },
  analytical: { learningLevel: 3, indoorLevel: 2, activeLevel: -1 },
  empathetic: { socialLevel: 3, creativityLevel: 1, indoorLevel: 1 },

  // 質問14: 理想的な趣味の時間帯
  morning: { activeLevel: 1, timeFlexibility: -1 },
  daytime: { activeLevel: 1, indoorLevel: -1 },
  evening: { indoorLevel: 2, soloFriendly: 1, activeLevel: -1 },
  flexible: { timeFlexibility: 3, soloFriendly: 1, indoorLevel: 1 },

  // 質問15: 趣味にかけられる予算
  minimal: { costLevel: -3, creativityLevel: 1, indoorLevel: 1 },
  moderate: { costLevel: 0 },
  invested: { costLevel: 2, learningLevel: 1 },
  unlimited: { costLevel: 3 },

  // 質問16: 趣味を楽しむ場所
  home: { indoorLevel: 3, costLevel: -1, soloFriendly: 2, activeLevel: -2 },
  nearby: { activeLevel: 1, timeFlexibility: 1 },
  facility: { socialLevel: 1, costLevel: 1, activeLevel: 1 },
  anywhere: { activeLevel: 1, timeFlexibility: 2 },

  // 質問17: 新しい趣味を始める際の不安
  continuity: { timeFlexibility: 2, soloFriendly: 1, indoorLevel: 1 },
  difficulty: { learningLevel: -1, creativityLevel: -1 },
  expense: { costLevel: -2, indoorLevel: 1 },
  time: { timeFlexibility: 2, indoorLevel: 1, activeLevel: -1 },

  // 質問18: 趣味を通して何を感じたい
  accomplishment: { learningLevel: 2, activeLevel: 1 },
  healing: { indoorLevel: 2, soloFriendly: 2, activeLevel: -2 },
  excitement: { activeLevel: 2, creativityLevel: 1, indoorLevel: -1 },
  peace: { soloFriendly: 2, indoorLevel: 2, activeLevel: -2 },

  // 質問19: 過去に楽しかった活動
  sports: { activeLevel: 3, indoorLevel: -2 },
  crafting: { creativityLevel: 3, soloFriendly: 1, indoorLevel: 2, activeLevel: -1 },
  research: { learningLevel: 3, indoorLevel: 3, activeLevel: -2 },
  music: { creativityLevel: 2, socialLevel: 1, indoorLevel: 1 },

  // 質問20: 趣味を始めるきっかけ
  immediate: { activeLevel: 1, learningLevel: -1 },
  sustainable: { soloFriendly: 2, learningLevel: 1, indoorLevel: 1, activeLevel: -1 },
  community: { socialLevel: 3, soloFriendly: -2, activeLevel: 1 },
  personal: { soloFriendly: 3, creativityLevel: 1, indoorLevel: 2, activeLevel: -1 },
};

// 初期プロフィール（ニュートラル）
const createNeutralProfile = (): UserProfile => ({
  activeLevel: 5,
  socialLevel: 5,
  creativityLevel: 5,
  learningLevel: 5,
  indoorLevel: 5,
  costLevel: 5,
  timeFlexibility: 5,
  soloFriendly: 5,
});

// 回答からユーザープロフィールを生成
export const generateUserProfile = (answers: string[]): UserProfile => {
  const profile = createNeutralProfile();

  answers.forEach((answer) => {
    const mapping = answerToProfileMapping[answer];
    if (mapping) {
      Object.entries(mapping).forEach(([key, value]) => {
        const profileKey = key as keyof UserProfile;
        profile[profileKey] = Math.max(
          0,
          Math.min(10, profile[profileKey] + (value || 0))
        );
      });
    }
  });

  return profile;
};

// 2つのプロフィール間の類似度を計算（0-100）
// 重み付けを導入して、特定のパラメータの影響を調整
const calculateSimilarity = (
  userProfile: UserProfile,
  hobbyProfile: HobbyProfile
): number => {
  const keys: (keyof UserProfile)[] = [
    "activeLevel",
    "socialLevel",
    "creativityLevel",
    "learningLevel",
    "indoorLevel",
    "costLevel",
    "timeFlexibility",
    "soloFriendly",
  ];

  // パラメータごとの重み（合計8.0）
  const weights: Record<keyof UserProfile, number> = {
    activeLevel: 1.2,
    socialLevel: 1.2,
    creativityLevel: 1.0,
    learningLevel: 1.0,
    indoorLevel: 1.2,
    costLevel: 0.8,
    timeFlexibility: 0.8,
    soloFriendly: 0.8,
  };

  let totalWeightedDifference = 0;
  let totalWeight = 0;

  keys.forEach((key) => {
    const diff = Math.abs(userProfile[key] - hobbyProfile[key]);
    const weight = weights[key];
    totalWeightedDifference += diff * weight;
    totalWeight += weight * 10; // 各パラメータの最大値10に重みをかける
  });

  // 加重平均による類似度計算
  const similarity = ((totalWeight - totalWeightedDifference) / totalWeight) * 100;

  return Math.round(similarity);
};

// 趣味とのマッチング結果
export interface HobbyMatch {
  hobby: HobbyData;
  score: number;
}

// ユーザープロフィールに基づいて趣味をランキング
export const rankHobbies = (
  userProfile: UserProfile,
  hobbies: HobbyData[]
): HobbyMatch[] => {
  const matches: HobbyMatch[] = hobbies.map((hobby) => ({
    hobby,
    score: calculateSimilarity(userProfile, hobby.profile),
  }));

  // スコアの高い順にソート
  return matches.sort((a, b) => b.score - a.score);
};

// 診断結果を取得（トップ3を返す）
export const getDiagnosisResult = (
  answers: string[],
  hobbies: HobbyData[]
): HobbyMatch[] => {
  const userProfile = generateUserProfile(answers);
  const rankedHobbies = rankHobbies(userProfile, hobbies);
  return rankedHobbies.slice(0, 3);
};
