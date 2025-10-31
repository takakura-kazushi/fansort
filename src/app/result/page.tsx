"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { hobbyDatabase } from "@/data/hobbies";
import { getDiagnosisResult } from "@/lib/diagnosticLogic";

function ResultContent() {
  const searchParams = useSearchParams();
  const answersParam = searchParams.get("answers");
  const modeParam = searchParams.get("mode");
  const answers = answersParam ? answersParam.split(",") : [];
  const mode = modeParam || "10";

  // 新しい診断ロジックを使用
  const matchResults = getDiagnosisResult(answers, hobbyDatabase);

  const recommendedHobby = matchResults[0]?.hobby || hobbyDatabase[0];
  const recommendedScore = matchResults[0]?.score || 0;
  const otherHobbies = matchResults.slice(1, 3).map((match) => match.hobby);

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
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full border border-green-300 mb-2">
              <p className="text-sm font-semibold text-green-700">
                相性度: {recommendedScore}%
              </p>
            </div>
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
