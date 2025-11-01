"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, useRef } from "react";
import { hobbyDatabase } from "@/data/hobbies";
import { getDiagnosisResult } from "@/lib/diagnosticLogic";
import { useAuth } from "@/context/AuthContext";
import { saveDiagnosisResult } from "@/lib/diagnosisService";

function ResultContent() {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const answersParam = searchParams.get("answers");
  const answers = answersParam ? answersParam.split(",") : [];
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const hasSaved = useRef(false); // 保存済みフラグ

  // 診断ロジックを使用
  const matchResults = getDiagnosisResult(answers, hobbyDatabase);
  const recommendedHobby = matchResults[0]?.hobby || hobbyDatabase[0];
  const recommendedScore = matchResults[0]?.score || 0;
  const otherHobbies = matchResults.slice(1, 3).map((match) => match.hobby);

  // ログインユーザーの場合、自動保存（1回のみ）
  useEffect(() => {
    // 既に保存済みの場合はスキップ
    if (hasSaved.current) {
      return;
    }

    // 保存条件チェック
    if (!user || answers.length === 0) {
      return;
    }

    // このセッションで既に保存済みかチェック
    const sessionKey = `diagnosis_saved_${answersParam}`;
    if (typeof window !== "undefined" && sessionStorage.getItem(sessionKey)) {
      console.log("Already saved in this session");
      return;
    }

    const saveResult = async () => {
      if (hasSaved.current || isSaving) {
        return;
      }

      hasSaved.current = true; // 保存開始をマーク
      setIsSaving(true);

      try {
        await saveDiagnosisResult(user.uid, {
          hobbyName: recommendedHobby.name,
          hobbyEmoji: recommendedHobby.emoji,
          score: recommendedScore,
          answers: answers,
          resultData: {
            difficulty: recommendedHobby.difficulty,
            cost: recommendedHobby.cost,
            highlights: recommendedHobby.highlights,
            description: recommendedHobby.description,
          },
        });

        // セッションストレージに保存済みマークを設定
        if (typeof window !== "undefined") {
          sessionStorage.setItem(sessionKey, "true");
        }

        setSaveMessage("診断結果を保存しました");
        setTimeout(() => {
          setSaveMessage("");
        }, 3000);
      } catch (error) {
        console.error("Failed to save diagnosis:", error);
        hasSaved.current = false; // エラー時は再試行可能にする
        setSaveMessage("保存に失敗しました");
        setTimeout(() => {
          setSaveMessage("");
        }, 3000);
      } finally {
        setIsSaving(false);
      }
    };

    saveResult();
  }, [user?.uid]); // userのuidのみを依存に含める

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 保存メッセージ */}
        {saveMessage && (
          <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-down z-50">
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{saveMessage}</span>
            </div>
          </div>
        )}

        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">診断結果</h1>
          <p className="text-gray-600">
            あなたにぴったりの趣味が見つかりました！
          </p>
          {!user && (
            <div className="inline-block bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2">
              <p className="text-sm text-yellow-800">
                💡{" "}
                <a href="/login" className="underline font-semibold">
                  ログイン
                </a>
                すると診断結果を保存できます
              </p>
            </div>
          )}
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
            この趣味をAIと深掘りする 🤖
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
