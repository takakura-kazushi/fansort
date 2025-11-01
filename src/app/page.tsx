export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">Funsort</h1>
          <p className="text-xl text-gray-600">
            「無趣味」から「最初の&quot;楽しい&quot;」まで
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-800">
              AIがあなたに最適な趣味を見つけます
            </h2>
            <p className="text-gray-600 leading-relaxed">
              簡単な質問に答えるだけで、あなたの性格や志向に合った趣味をAIが診断。
              <br />
              さらに、AIの「先輩」が趣味の始め方から楽しみ方まで丁寧にガイドします。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 py-4">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="w-12 h-12 bg-blue-500 rounded-lg mb-3 flex items-center justify-center mx-auto">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">手軽な発見</h3>
              <p className="text-sm text-gray-600">
                5〜10問の質問で自分に合った趣味が見つかる
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
              <div className="w-12 h-12 bg-purple-500 rounded-lg mb-3 flex items-center justify-center mx-auto">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">AI伴走</h3>
              <p className="text-sm text-gray-600">
                友人と話すように楽しく知識を深められる
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl border border-pink-200">
              <div className="w-12 h-12 bg-pink-500 rounded-lg mb-3 flex items-center justify-center mx-auto">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">成功体験</h3>
              <p className="text-sm text-gray-600">
                具体的な目標で達成感を味わえる
              </p>
            </div>
          </div>

          <a
            href="/diagnosis"
            className="inline-block w-full md:w-auto px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            診断を始める
          </a>
        </div>

        <p className="text-sm text-gray-500">所要時間: 約3分</p>
      </div>
    </main>
  );
}
