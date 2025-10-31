"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const hobbyDatabase = {
  active: {
    name: "ランニング・ジョギング",
    emoji: "🏃",
    description:
      "身体を動かしてリフレッシュ。自分のペースで始められる手軽なスポーツ",
    difficulty: "★☆☆☆☆",
    cost: "★☆☆☆☆",
    highlights: ["健康増進", "達成感", "一人でも楽しめる"],
  },
  indoor: {
    name: "読書",
    emoji: "📚",
    description: "様々な世界を体験できる、知的好奇心を満たす趣味",
    difficulty: "★☆☆☆☆",
    cost: "★★☆☆☆",
    highlights: ["知識が増える", "想像力向上", "リラックス効果"],
  },
  creative: {
    name: "イラスト・絵画",
    emoji: "🎨",
    description: "自分の想像を形にする創造的な趣味",
    difficulty: "★★★☆☆",
    cost: "★★☆☆☆",
    highlights: ["創造性向上", "達成感", "作品が残る"],
  },
  learning: {
    name: "プログラミング",
    emoji: "💻",
    description: "論理的思考力を鍛えながら、実用的なスキルを習得",
    difficulty: "★★★☆☆",
    cost: "★☆☆☆☆",
    highlights: ["スキルアップ", "問題解決力", "副業にも"],
  },
  social: {
    name: "ボードゲーム",
    emoji: "🎲",
    description: "友人と楽しめる、コミュニケーションツールとしても最適",
    difficulty: "★★☆☆☆",
    cost: "★★☆☆☆",
    highlights: ["交流が増える", "戦略性", "多様なジャンル"],
  },
  nature: {
    name: "植物栽培・ガーデニング",
    emoji: "🌱",
    description: "生命の成長を見守る、癒しの趣味",
    difficulty: "★★☆☆☆",
    cost: "★★☆☆☆",
    highlights: ["癒し効果", "達成感", "実用的"],
  },
  food: {
    name: "料理・お菓子作り",
    emoji: "🍳",
    description: "実用的で創造的、美味しい成果が得られる趣味",
    difficulty: "★★☆☆☆",
    cost: "★★☆☆☆",
    highlights: ["実用的", "創造性", "共有できる"],
  },
};

function ResultContent() {
  const searchParams = useSearchParams();
  const answersParam = searchParams.get("answers");
  const answers = answersParam ? answersParam.split(",") : [];

  // 簡易的な診断ロジック：最も多く出現した回答タイプを採用
  const answerCounts: { [key: string]: number } = {};
  answers.forEach((answer) => {
    answerCounts[answer] = (answerCounts[answer] || 0) + 1;
  });

  const primaryType =
    Object.keys(answerCounts).sort(
      (a, b) => answerCounts[b] - answerCounts[a]
    )[0] || "indoor";

  const recommendedHobby =
    hobbyDatabase[primaryType as keyof typeof hobbyDatabase] ||
    hobbyDatabase.indoor;

  // おすすめの趣味を3つピックアップ
  const allHobbies = Object.values(hobbyDatabase);
  const otherHobbies = allHobbies
    .filter((h) => h.name !== recommendedHobby.name)
    .slice(0, 2);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">診断結果</h1>
          <p className="text-gray-600">
            あなたにぴったりの趣味が見つかりました！
          </p>
        </div>

        {/* メインの推奨趣味 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center space-y-4">
            <div className="text-7xl">{recommendedHobby.emoji}</div>
            <h2 className="text-3xl font-bold text-gray-800">
              {recommendedHobby.name}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {recommendedHobby.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-4">
            <div className="p-4 bg-blue-50 rounded-xl">
              <h3 className="font-semibold text-gray-700 mb-2">難易度</h3>
              <p className="text-yellow-500 text-xl">
                {recommendedHobby.difficulty}
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              <h3 className="font-semibold text-gray-700 mb-2">初期費用</h3>
              <p className="text-yellow-500 text-xl">{recommendedHobby.cost}</p>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="font-semibold text-gray-700 mb-3">この趣味の魅力</h3>
            <div className="flex flex-wrap gap-2">
              {recommendedHobby.highlights.map((highlight, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700 rounded-full text-sm font-medium"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          <a
            href={`/chat?hobby=${encodeURIComponent(recommendedHobby.name)}`}
            className="block w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 text-center"
          >
            この趣味をAIと深掘りする
          </a>
        </div>

        {/* その他のおすすめ */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 text-center">
            こちらの趣味もおすすめです
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {otherHobbies.map((hobby, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 space-y-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{hobby.emoji}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {hobby.name}
                    </h3>
                    <p className="text-sm text-gray-600">{hobby.description}</p>
                  </div>
                </div>
                <a
                  href={`/chat?hobby=${encodeURIComponent(hobby.name)}`}
                  className="block w-full py-2 text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                >
                  詳しく見る
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pt-8">
          <a
            href="/diagnosis"
            className="text-gray-600 hover:text-gray-800 underline"
          >
            もう一度診断する
          </a>
        </div>
      </div>
    </main>
  );
}

export default function Result() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
          <div className="text-gray-600">読み込み中...</div>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
