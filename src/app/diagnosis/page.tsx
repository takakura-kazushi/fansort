"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const questions = [
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
];

export default function Diagnosis() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 診断結果ページへ遷移（回答をクエリパラメータで渡す）
      router.push(`/result?answers=${newAnswers.join(",")}`);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold text-gray-800">趣味診断</h1>
            <span className="text-sm text-gray-600">
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-8">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.value)}
                className="w-full p-4 text-left bg-gray-50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl border-2 border-transparent hover:border-purple-300 transition-all duration-200 hover:shadow-md"
              >
                <span className="text-gray-700 font-medium">{option.text}</span>
              </button>
            ))}
          </div>
        </div>

        {currentQuestion > 0 && (
          <button
            onClick={handleBack}
            className="mt-4 px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← 前の質問に戻る
          </button>
        )}
      </div>
    </main>
  );
}
