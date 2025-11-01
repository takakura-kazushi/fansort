"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  getDiagnosisHistory,
  SavedDiagnosisHistory,
} from "@/lib/diagnosisService";
import {
  getMyHobby,
  MyHobby,
  getUserQuests,
  updateQuestStatus,
  UserQuest,
} from "@/lib/hobbyService";

export default function MyPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [history, setHistory] = useState<SavedDiagnosisHistory[]>([]);
  const [myHobby, setMyHobby] = useState<MyHobby | null>(null);
  const [quests, setQuests] = useState<UserQuest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"diagnosis" | "quests">(
    "diagnosis"
  );

  useEffect(() => {
    // 未認証の場合はログインページへ
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }

    // 診断履歴の取得
    if (user) {
      loadDiagnosisHistory();
      loadMyHobby();
      loadQuests();
    }
  }, [user, authLoading, router]);

  const loadDiagnosisHistory = async () => {
    if (!user) return;

    try {
      const data = await getDiagnosisHistory(user.uid);
      setHistory(data);
    } catch (error) {
      console.error("Failed to load diagnosis history:", error);
    }
  };

  const loadMyHobby = async () => {
    if (!user) return;

    try {
      const data = await getMyHobby(user.uid);
      setMyHobby(data);
    } catch (error) {
      console.error("Failed to load my hobby:", error);
    }
  };

  const loadQuests = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const data = await getUserQuests(user.uid);
      setQuests(data);
    } catch (error) {
      console.error("Failed to load quests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleQuestStatus = async (
    questId: string,
    currentStatus: "incomplete" | "complete"
  ) => {
    if (!user) return;

    const newStatus = currentStatus === "complete" ? "incomplete" : "complete";

    try {
      await updateQuestStatus(user.uid, questId, newStatus);
      // ローカルステートを更新
      setQuests(
        quests.map((q) => (q.id === questId ? { ...q, status: newStatus } : q))
      );
    } catch (error) {
      console.error("Failed to update quest status:", error);
      alert("ステータスの更新に失敗しました");
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-gray-600">読み込み中...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* ヘッダー */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {user.displayName?.charAt(0).toUpperCase() || "U"}
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            {user.displayName || "匿名ユーザー"}
          </h1>
          <p className="text-gray-600">{user.email}</p>
        </div>

        {/* マイ趣味カード */}
        {myHobby && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-xl p-6 border-2 border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-5xl">{myHobby.hobbyEmoji}</span>
                <div>
                  <p className="text-sm text-green-600 font-semibold">
                    マイ趣味
                  </p>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {myHobby.hobbyName}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(myHobby.setAt).toLocaleDateString("ja-JP")}
                    から継続中
                  </p>
                </div>
              </div>
              <a
                href={`/chat?hobby=${encodeURIComponent(myHobby.hobbyName)}`}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-full hover:shadow-lg transition-all"
              >
                AIと話す
              </a>
            </div>
          </div>
        )}

        {/* タブ */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab("diagnosis")}
                className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                  activeTab === "diagnosis"
                    ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                診断履歴
              </button>
              <button
                onClick={() => setActiveTab("quests")}
                className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                  activeTab === "quests"
                    ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                クエスト
                {quests.length > 0 && (
                  <span className="ml-2 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                    {quests.filter((q) => q.status === "incomplete").length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* 診断履歴タブ */}
          {activeTab === "diagnosis" && (
            <div className="p-6">
              {history.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <div className="text-6xl">📊</div>
                  <p className="text-gray-600">まだ診断履歴がありません</p>
                  <a
                    href="/diagnosis"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                  >
                    診断を始める
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                      診断回数: {history.length}回
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-4xl">{item.hobbyEmoji}</span>
                            <div>
                              <h3 className="text-xl font-bold text-gray-800">
                                {item.hobbyName}
                              </h3>
                              <div className="inline-block px-2 py-1 bg-green-100 rounded-full mt-1">
                                <span className="text-xs font-semibold text-green-700">
                                  相性度: {item.score}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-4">
                          {item.resultData?.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.resultData?.highlights.map(
                            (highlight, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                              >
                                {highlight}
                              </span>
                            )
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <span className="text-xs text-gray-500">
                            {formatDate(item.diagnosedAt)}
                          </span>
                          <a
                            href={`/chat?hobby=${encodeURIComponent(
                              item.hobbyName
                            )}`}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold rounded-full hover:shadow-md transition-all"
                          >
                            AIと話す
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* クエストタブ */}
          {activeTab === "quests" && (
            <div className="p-6">
              {!myHobby ? (
                <div className="text-center py-12 space-y-4">
                  <div className="text-6xl">🎯</div>
                  <p className="text-gray-600">
                    まずはマイ趣味を設定しましょう
                  </p>
                  <a
                    href="/diagnosis"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                  >
                    診断を始める
                  </a>
                </div>
              ) : quests.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <div className="text-6xl">📝</div>
                  <p className="text-gray-600">まだクエストがありません</p>
                  <p className="text-sm text-gray-500">
                    AIとのチャットでクエストを作成できます
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                      進行中:{" "}
                      {quests.filter((q) => q.status === "incomplete").length} /
                      完了:{" "}
                      {quests.filter((q) => q.status === "complete").length}
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {quests.map((quest) => (
                      <div
                        key={quest.id}
                        className={`bg-white rounded-xl border-2 p-5 transition-all ${
                          quest.status === "complete"
                            ? "border-green-200 bg-green-50"
                            : "border-gray-200 hover:border-purple-300"
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <button
                            onClick={() =>
                              handleToggleQuestStatus(quest.id, quest.status)
                            }
                            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              quest.status === "complete"
                                ? "bg-green-500 border-green-500"
                                : "border-gray-300 hover:border-purple-500"
                            }`}
                          >
                            {quest.status === "complete" && (
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </button>

                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3
                                  className={`text-lg font-semibold ${
                                    quest.status === "complete"
                                      ? "text-gray-500 line-through"
                                      : "text-gray-800"
                                  }`}
                                >
                                  {quest.title}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  {quest.description}
                                </p>
                              </div>
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                  quest.difficulty === "beginner"
                                    ? "bg-green-100 text-green-700"
                                    : quest.difficulty === "intermediate"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {quest.difficulty === "beginner"
                                  ? "初級"
                                  : quest.difficulty === "intermediate"
                                  ? "中級"
                                  : "上級"}
                              </span>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-600">
                              <span className="flex items-center">
                                <svg
                                  className="w-4 h-4 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                {quest.estimatedTime}
                              </span>
                            </div>

                            {quest.tips.length > 0 && (
                              <details className="mt-3">
                                <summary className="text-sm text-purple-600 cursor-pointer hover:text-purple-800">
                                  💡 ヒントを見る
                                </summary>
                                <ul className="mt-2 space-y-1 text-sm text-gray-600 pl-4">
                                  {quest.tips.map((tip, index) => (
                                    <li key={index} className="list-disc">
                                      {tip}
                                    </li>
                                  ))}
                                </ul>
                              </details>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* アクションボタン */}
        <div className="text-center space-y-4">
          <a
            href="/diagnosis"
            className="inline-block px-8 py-3 bg-white text-gray-700 font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 border-2 border-gray-200"
          >
            新しく診断する
          </a>
        </div>
      </div>
    </main>
  );
}
