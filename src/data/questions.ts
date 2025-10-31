export interface QuestionOption {
  text: string;
  value: string;
}

export interface Question {
  id: number;
  question: string;
  options: QuestionOption[];
}

export const allQuestions: Question[] = [
  {
    id: 1,
    question: "休日の理想的な過ごし方は？",
    options: [
      { text: "外でアクティブに体を動かす", value: "active" },
      { text: "家でゆっくり自分の時間を楽しむ", value: "indoor" },
      { text: "友人や知人と交流する", value: "social" },
      { text: "新しい知識やスキルを学ぶ", value: "learning" },
    ],
  },
  {
    id: 2,
    question: "どんな瞬間にワクワクしますか？",
    options: [
      { text: "何かを作り上げたとき", value: "creative" },
      { text: "目標を達成したとき", value: "achievement" },
      { text: "新しい発見をしたとき", value: "discovery" },
      { text: "人と共感し合えたとき", value: "empathy" },
    ],
  },
  {
    id: 3,
    question: "時間とお金があったら何をしたい？",
    options: [
      { text: "旅行や冒険に出かける", value: "adventure" },
      { text: "趣味の道具や材料を揃える", value: "collecting" },
      { text: "スキルアップのための投資", value: "skill" },
      { text: "リラックスできる環境を整える", value: "comfort" },
    ],
  },
  {
    id: 4,
    question: "ストレス解消法は？",
    options: [
      { text: "体を動かして汗を流す", value: "physical" },
      { text: "好きなことに没頭する", value: "immersion" },
      { text: "自然や静かな場所で過ごす", value: "nature" },
      { text: "美味しいものを食べる", value: "food" },
    ],
  },
  {
    id: 5,
    question: "継続のモチベーションになるのは？",
    options: [
      { text: "成長を実感できること", value: "growth" },
      { text: "楽しさや面白さ", value: "fun" },
      { text: "他の人との繋がり", value: "connection" },
      { text: "形に残る成果物", value: "tangible" },
    ],
  },
  {
    id: 6,
    question: "普段の生活で大切にしていることは？",
    options: [
      { text: "健康的な生活習慣", value: "health" },
      { text: "自己表現や創造性", value: "expression" },
      { text: "効率性と生産性", value: "efficiency" },
      { text: "心の豊かさと充実感", value: "fulfillment" },
    ],
  },
  {
    id: 7,
    question: "新しいことを始めるときに重視するのは？",
    options: [
      { text: "初期費用が少ないこと", value: "cost" },
      { text: "すぐに始められること", value: "accessibility" },
      { text: "将来性や実用性", value: "practicality" },
      { text: "自分の興味関心", value: "interest" },
    ],
  },
  {
    id: 8,
    question: "理想的な学習スタイルは？",
    options: [
      { text: "実践しながら学ぶ", value: "practice" },
      { text: "理論を理解してから実践", value: "theory" },
      { text: "人から教わる", value: "guided" },
      { text: "独学で自分のペースで", value: "self-paced" },
    ],
  },
  {
    id: 9,
    question: "達成感を感じるのはどんなとき？",
    options: [
      { text: "難しい課題をクリアしたとき", value: "challenge" },
      { text: "コツコツ続けたことが形になったとき", value: "accumulation" },
      { text: "他の人に認められたとき", value: "recognition" },
      { text: "自分の変化や成長を感じたとき", value: "transformation" },
    ],
  },
  {
    id: 10,
    question: "趣味を通して得たいものは？",
    options: [
      { text: "充実感と楽しさ", value: "enjoyment" },
      { text: "新しい人間関係", value: "relationships" },
      { text: "実用的なスキル", value: "skills" },
      { text: "心身のリフレッシュ", value: "refresh" },
    ],
  },
  {
    id: 11,
    question: "あなたの性格に最も近いのは？",
    options: [
      { text: "行動派で新しいことに挑戦するのが好き", value: "adventurous" },
      { text: "慎重派で計画的に物事を進める", value: "methodical" },
      { text: "社交的で人と一緒にいるのが好き", value: "sociable" },
      { text: "内向的で一人の時間を大切にする", value: "introspective" },
    ],
  },
  {
    id: 12,
    question: "週末に時間ができたら何をする？",
    options: [
      { text: "外に出かけて新しい体験をする", value: "explore" },
      { text: "家でじっくり趣味に取り組む", value: "focused" },
      { text: "友人や家族と過ごす", value: "together" },
      { text: "のんびり休息する", value: "relax" },
    ],
  },
  {
    id: 13,
    question: "自分の強みだと思うことは？",
    options: [
      { text: "体力や運動能力", value: "athletic" },
      { text: "創造力や発想力", value: "imaginative" },
      { text: "論理的思考力", value: "analytical" },
      { text: "共感力やコミュニケーション能力", value: "empathetic" },
    ],
  },
  {
    id: 14,
    question: "理想的な趣味の時間帯は？",
    options: [
      { text: "朝の時間を活用したい", value: "morning" },
      { text: "日中の明るい時間", value: "daytime" },
      { text: "夕方から夜にかけて", value: "evening" },
      { text: "時間帯は特にこだわらない", value: "flexible" },
    ],
  },
  {
    id: 15,
    question: "趣味にかけられる予算は？",
    options: [
      { text: "できるだけお金をかけたくない", value: "minimal" },
      { text: "月数千円程度なら問題ない", value: "moderate" },
      { text: "価値があれば投資したい", value: "invested" },
      { text: "予算は特に気にしない", value: "unlimited" },
    ],
  },
  {
    id: 16,
    question: "趣味を楽しむ場所の希望は？",
    options: [
      { text: "自宅で完結できる", value: "home" },
      { text: "近所で気軽にできる", value: "nearby" },
      { text: "特定の施設や場所に通う", value: "facility" },
      { text: "様々な場所で楽しめる", value: "anywhere" },
    ],
  },
  {
    id: 17,
    question: "新しい趣味を始める際に不安なことは？",
    options: [
      { text: "続けられるか自信がない", value: "continuity" },
      { text: "難しすぎないか心配", value: "difficulty" },
      { text: "お金がかかりすぎないか", value: "expense" },
      { text: "時間が取れるか不安", value: "time" },
    ],
  },
  {
    id: 18,
    question: "趣味を通して何を感じたい？",
    options: [
      { text: "達成感や充実感", value: "accomplishment" },
      { text: "癒しやリラックス", value: "healing" },
      { text: "刺激や興奮", value: "excitement" },
      { text: "平和や安らぎ", value: "peace" },
    ],
  },
  {
    id: 19,
    question: "過去に楽しかった活動は？",
    options: [
      { text: "スポーツや体を動かすこと", value: "sports" },
      { text: "絵を描いたり物を作ること", value: "crafting" },
      { text: "本を読んだり調べ物をすること", value: "research" },
      { text: "音楽を聴いたり演奏すること", value: "music" },
    ],
  },
  {
    id: 20,
    question: "趣味を始めるきっかけとして魅力的なのは？",
    options: [
      { text: "すぐに結果が見える", value: "immediate" },
      { text: "長く続けられる", value: "sustainable" },
      { text: "人との繋がりが生まれる", value: "community" },
      { text: "自分だけの世界を持てる", value: "personal" },
    ],
  },
];
