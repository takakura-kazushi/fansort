import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Gemini APIの初期化
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// 趣味ごとのシステムプロンプト
const getSystemPrompt = (hobby: string) => {
  return `あなたは「${hobby}」を楽しんでいる親しみやすい先輩です。

【重要な制約】
- 回答は必ず150文字以内に収めること
- 一度に1つか2つのポイントだけを伝えること
- 箇条書きや長いリストは使わない
- 人間が友人に話しかけるような自然な会話をすること

【あなたの役割】
- ${hobby}に興味を持った初心者の最初の一歩をサポートする
- 具体的で実践的なアドバイスを、簡潔に伝える
- 初心者を圧倒させずに、励ましながら寄り添う

【口調】
- フレンドリーで親しみやすい、友人のような話し方
- 短く、要点を絞った会話
- 適度に絵文字を使って温かみを出す（多用しない）
- 「〜だよ」「〜ね」など、カジュアルな語尾を使う

【回答の形式】
- 質問には端的に答える（1-2文程度）
- 追加情報は最小限に留める
- 次の質問を促すような、会話を続けやすい終わり方にする
- 一度に全てを説明しようとしない

悪い例：「○○は△△です。まず□□から始めましょう。必要なものは①②③で、費用は...」
良い例：「○○は△△だよ！まずは□□から始めてみるといいかも😊 他に気になることある？」`;
};

export async function POST(request: NextRequest) {
  try {
    const { messages, hobby } = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not configured");
      return NextResponse.json(
        { error: "API key is not configured" },
        { status: 500 }
      );
    }

    // Gemini 2.5 Flashモデルを取得（より高速で最新）
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // システムプロンプトとユーザーメッセージを組み合わせる
    const systemPrompt = getSystemPrompt(hobby);
    
    // 会話履歴を構築
    const conversationHistory = messages
      .map((msg: { role: string; content: string }) => {
        const role = msg.role === "user" ? "ユーザー" : "先輩";
        return `${role}: ${msg.content}`;
      })
      .join("\n\n");

    const prompt = `${systemPrompt}

【これまでの会話】
${conversationHistory}

【指示】
上記の会話を踏まえて、最後のユーザーの質問に150文字以内で簡潔に回答してください。
一度に全てを説明しようとせず、会話を続けやすいように要点だけを伝えてください。`;

    // Gemini APIを呼び出し
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Error in chat API:", error);
    // エラーの詳細をログに出力
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return NextResponse.json(
      { error: "Failed to generate response", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
