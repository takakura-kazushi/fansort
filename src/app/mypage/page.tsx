"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  getDiagnosisHistory,
  SavedDiagnosisHistory,
} from "@/lib/diagnosisService";

export default function MyPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [history, setHistory] = useState<SavedDiagnosisHistory[]>([]);
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
    }
  }, [user, authLoading, router]);

  const loadDiagnosisHistory = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const data = await getDiagnosisHistory(user.uid);
      setHistory(data);
    } catch (error) {
      console.error("Failed to load diagnosis history:", error);
    } finally {
      setLoading(false);
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
                <span className="ml-2 text-xs text-gray-500">(準備中)</span>
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

          {/* クエストタブ（準備中） */}
          {activeTab === "quests" && (
            <div className="p-6">
              <div className="text-center py-12 space-y-4">
                <div className="text-6xl">🎯</div>
                <p className="text-gray-600">クエスト機能は準備中です</p>
                <p className="text-sm text-gray-500">
                  AIとのチャットから目標を設定できる機能を準備しています
                </p>
              </div>
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
