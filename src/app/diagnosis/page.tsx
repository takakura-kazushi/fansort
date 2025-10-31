"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { allQuestions } from "@/data/questions";

// Fisher-Yatesアルゴリズムで配列をシャッフル
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const questionModes = [
  {
    count: 5,
    duration: "約1分",
    description: "クイック診断",
    detail: "手軽に自分の趣味を見つけられます",
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50",
    borderColor: "border-blue-200",
  },
  {
    count: 10,
    duration: "約3分",
    description: "バランス型",
    detail: "精度と手軽さのバランスが取れた診断",
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-50 to-pink-50",
    borderColor: "border-purple-200",
    recommended: true,
  },
  {
    count: 20,
    duration: "約5分",
    description: "詳細診断",
    detail: "より正確にあなたに合った趣味を診断",
    color: "from-pink-500 to-rose-500",
    bgColor: "from-pink-50 to-rose-50",
    borderColor: "border-pink-200",
  },
];

export default function Diagnosis() {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  // useMemoでシャッフルされた質問を一度だけ生成
  const shuffledQuestions = useMemo(() => shuffleArray(allQuestions), []);

  const questions =
    selectedMode !== null ? shuffledQuestions.slice(0, selectedMode) : [];

  const handleModeSelect = (count: number) => {
    setSelectedMode(count);
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 診断結果ページへ遷移（回答をクエリパラメータで渡す）
      router.push(
        `/result?answers=${newAnswers.join(",")}&mode=${selectedMode}`
      );
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    } else {
      // 最初の質問で戻るボタンを押したらモード選択に戻る
      setSelectedMode(null);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // モード選択画面
  if (selectedMode === null) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-5xl w-full space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-800">趣味診断</h1>
            <p className="text-lg text-gray-600">
              診断の質問数を選択してください
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {questionModes.map((mode) => (
              <div
                key={mode.count}
                className="relative bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-transparent hover:border-purple-300"
                onClick={() => handleModeSelect(mode.count)}
              >
                {mode.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
                      おすすめ
                    </span>
                  </div>
                )}

                <div className="text-center space-y-4">
                  <h2 className="text-6xl font-bold text-gray-800 mb-2">
                    {mode.count}
                  </h2>
                  <p className="text-sm text-gray-500 -mt-2 mb-4">問</p>
                  <p className="text-xl font-semibold bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
                    {mode.description}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed px-2">
                    {mode.detail}
                  </p>
                  <div
                    className={`inline-block px-4 py-2 bg-gradient-to-r ${mode.bgColor} rounded-full border ${mode.borderColor}`}
                  >
                    <p className="text-sm font-medium text-gray-700">
                      ⏱️ {mode.duration}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    className={`w-full py-3 bg-gradient-to-r ${mode.color} text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200`}
                  >
                    この設定で診断開始
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="/"
              className="text-gray-600 hover:text-gray-800 underline text-sm"
            >
              ← トップページに戻る
            </a>
          </div>
        </div>
      </main>
    );
  }

  // 診断質問画面
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold text-gray-800">
              趣味診断 ({selectedMode}問モード)
            </h1>
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

        <button
          onClick={handleBack}
          className="mt-4 px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          ← {currentQuestion === 0 ? "モード選択に戻る" : "前の質問に戻る"}
        </button>
      </div>
    </main>
  );
}
