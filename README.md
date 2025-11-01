This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Funsort 企画書

## 1. アプリ概要

### 1.1. コンセプト

**「無趣味」から「最初の“楽しい”」までを AI が伴走する、新感覚の趣味発見サポートアプリ**

多くの人が「何か趣味を持ちたい」と思いながらも、何から始めれば良いかわからなかったり、一人で始めることにハードルを感じたりしています。このアプリは、簡単な性格診断を通してユーザーに最適な趣味を提案し、さらに AI の「先輩」が趣味の始め方から楽しみ方までを丁寧にガイドすることで、最初の一歩を踏み出し、継続するまでをサポートします。

### 1.2. ターゲットユーザー

- 趣味がない、または見つけたいと思っている 20 代〜40 代の男女
- 新しいことを始めたいが、一人では不安を感じる、またはモチベーションが続かない人
- 仕事や日常生活に追われ、趣味を探す時間や気力がない人

### 1.3. 提供価値

- **手軽な発見体験:** MBTI 診断のように、いくつかの質問に答えるだけで、自分に合った趣味の候補が見つかる。
- **挫折しない継続サポート:** AI が一緒に趣味の世界を探求してくれるため、まるで友人と話しているかのように楽しく知識を深められる。
- **最初の成功体験:** 「試合を観に行く」「1 曲弾ききる」といった具体的な目標（クエスト）を設定し、達成感を味わうことで、趣味を「楽しい」と感じる瞬間を提供する。

---

## 2. 機能要件（プロトタイプ版）

| 機能名              | 概要                                                                                                 | 詳細                                                                                                   |
| :------------------ | :--------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| **趣味発見診断**    | 5〜10 問程度の選択式の質問に回答することで、ユーザーの性格や志向を分析し、おすすめの趣味を提案する。 | - 質問はライフスタイルや価値観に関するもの。<br>- 診断ロジックはシンプルなものから実装する。           |
| **診断結果表示**    | 診断で提案された趣味の概要、魅力、始めやすさなどを表示する。                                         | - 各趣味にキャッチーな紹介文を添える。<br>- 「この趣味を AI と深掘りする」ボタンを設置。               |
| **AI 伴走チャット** | 各趣味専門の AI と対話できるチャット機能。                                                           | - 趣味ごとに最適化されたシステムプロンプトを用意。<br>- ユーザーの質問に答え、次のステップを提案する。 |

---

## 3. 技術構成案（プロトタイプ版）

| カテゴリ           | 使用技術            | 目的                                                                                      |
| :----------------- | :------------------ | :---------------------------------------------------------------------------------------- |
| **フレームワーク** | **Next.js (React)** | 迅速な開発と高い拡張性を両立するため。フロントエンドとバックエンド（API）を統合管理。     |
| **UI**             | **Tailwind CSS**    | モダンでレスポンシブなデザインを効率的に構築するため。                                    |
| **AI（LLM）**      | **Gemini API**      | 高度な対話能力を持つ AI チャット機能を実装するため。Next.js の API ルート経由で呼び出す。 |

---

## 4. 画面設計（ワイヤーフレーム）

1.  **トップページ**: コンセプト紹介と診断開始ボタン
2.  **診断ページ**: 質問と選択肢、プログレスバー
3.  **診断結果ページ**: おすすめ趣味のカード表示
4.  **AI チャットページ**: AI とのチャットインターフェース

---

## 5. プロトタイプ開発ステップ（2 週間集中プラン）

### **1 週目: UI 構築と診断機能の実装**

- **Day 1-2: Next.js 環境構築とコンポーネント設計**
  - `create-next-app`でプロジェクトをセットアップ。
  - トップ、診断、結果、チャットの各ページ/コンポーネントの雛形を作成する。
- **Day 3-4: 状態管理と診断ロジックの実装**
  - `useState`を用いて診断の状態（現在の質問番号、回答など）を管理する。
  - 回答に応じて結果を振り分ける簡易的なロジックを実装する。
- **Day 5-7: UI の作り込みと動的処理**
  - Tailwind CSS でデザインを整える。
  - 質問の切り替えやプログレスバーの更新など、インタラクティブな処理を実装する。

### **2 週目: AI チャット機能の実装と仕上げ**

- **Day 8-10: API ルートと Gemini API 連携**
  - Next.js の API ルートを作成し、そこから Gemini API を安全に呼び出す処理を実装する。
- **Day 11-12: チャット UI の実装**
  - フロントエンドと API ルートを連携させ、非同期でメッセージを送受信する UI を構築する。
- **Day 13-14: 全体テストとデプロイ**
  - 全ての機能が意図通りに動くかテストし、軽微なバグ修正を行う。
  - Vercel や Firebase Hosting にデプロイし、プロトタイプを公開する。

---

## 6. 実装済み機能

✅ **基本機能の実装完了**

- トップページ（コンセプト紹介と診断開始ボタン）
- 診断ページ（質問表示と選択肢、プログレスバー）
- 診断結果ページ（おすすめ趣味の表示とその他の候補）
- AI チャット機能（Gemini API 連携）
- レスポンシブデザイン（Tailwind CSS）

---

## 7. Phase 2 開発方針: ユーザー機能の実装

Phase 1 のプロトタイプを元に、ユーザーが「趣味を継続する」ためのコア機能（ログイン、履歴保存、目標管理）を実装し、単なる診断ツールから「パーソナルな伴走アプリ」へと進化させます。

---

## 8. Phase 2 技術構成 (追加)

Phase 1 の技術構成に加え、以下の BaaS (Backend as a Service) を導入し、迅速な開発を実現します。

| カテゴリ         | 使用技術                    | 目的                                                                                          |
| :--------------- | :-------------------------- | :-------------------------------------------------------------------------------------------- |
| **認証**         | **Firebase Authentication** | Google, X (Twitter), Email 等の簡単なソーシャルログイン機能を提供し、ユーザーを識別するため。 |
| **データベース** | **Firebase Firestore**      | ユーザーごとの診断履歴、チャット履歴、クエスト進捗をリアルタイムで保存・同期するため。        |

---

## 9. Firestore データ構造案

Firestore の NoSQL データベース構造を以下のように設計します。

```
/users/{userId}/
  ├─ profile (Document)
  │    ├─ email: "user@example.com"
  │    └─ name: "ユーザー名"
  │
  └─ diagnosisHistory (Collection)
       └─ {historyId} (Document)
            ├─ hobbyName: "野球観戦"
            ├─ diagnosedAt: (Timestamp)
            └─ resultData: { ... }

/chatSessions/{sessionId}/
  ├─ userId: "{userId}" (紐づくユーザー)
  ├─ hobbyName: "野球観戦"
  ├─ createdAt: (Timestamp)
  └─ messages (Collection)
       └─ {messageId} (Document)
            ├─ role: "user" | "model"
            ├─ content: "メッセージ内容"
            └─ sentAt: (Timestamp)

/quests/{userId}/ (ユーザーごとのクエストを管理)
  └─ userQuests (Collection)
       └─ {questId} (Document)
            ├─ title: "基本的な野球ルールを3つ覚える"
            ├─ status: "incomplete" | "complete"
            ├─ createdAt: (Timestamp)
            └─ hobbyName: "野球観戦"
```

---

## 10. Phase 2 開発ステップ

### Step 1: Firebase プロジェクトセットアップ

- Firebase コンソールでプロジェクトを作成し、ウェブアプリを追加。
- Next.js プロジェクトに `firebase` SDK をインストール。
- `src/lib/firebase.ts` (または `src/utils/firebase.ts`) を作成し、Firebase App, Auth, Firestore を初期化する設定を記述。
- Firestore のセキュリティルールを設定（`request.auth != null` を基本とする）。

### Step 2: 認証機能の実装

- 認証状態（ログインしているか、ユーザー情報は何か）をグローバルに管理するための React Context (`src/context/AuthContext.tsx`) を作成。
- `src/app/layout.tsx` で `AuthContext` をラップ。
- ヘッダーコンポーネントに、ログイン状態に応じて「ログイン」「ログアウト」「マイページ」ボタンを表示するロジックを追加。
- `src/app/login/page.tsx` を作成し、Google ログイン（推奨）または Email/Password ログインの UI を実装。

### Step 3: 診断履歴の保存と表示

- ユーザーがログイン状態で診断を完了した際、診断結果を `users/{userId}/diagnosisHistory` コレクションに保存する処理を追加。
- `src/app/mypage/page.tsx` を作成し、`diagnosisHistory` コレクションから過去の診断履歴を読み込んで一覧表示する。

### Step 4: チャット履歴の保存と復元

- 「AI と趣味を深掘りする」ボタン押下時、`chatSessions` コレクションに新しいドキュメントを作成（または既存のセッションを特定）。
- チャットページ (`src/app/chat/[sessionId]/page.tsx` のように動的ルートに変更）は、`sessionId` を元に `messages` サブコレクションから履歴を読み込んで表示。
- メッセージ送信時 (`/api/chat`) の処理を改修し、ユーザーと AI の発言を `messages` サブコレクションにリアルタイムで追加保存する。

### Step 5: クエスト（目標）管理機能の実装

- チャット UI に「クエストとして追加」ボタンを実装。AI の回答（例：「まずはルールを 3 つ覚えましょう」）をユーザーが選択し、ボタンを押すと `quests/{userId}/userQuests` にドキュメントが作成される。
- `src/app/mypage/page.tsx` に「クエスト一覧」タブを追加。
- ユーザーがクエストのステータス（未完了/完了）をトグルで変更できる UI を実装。

---

## 11. 将来的な拡張アイデア (Phase 3)

- **趣味コミュニティへの誘導機能**: 関連する SNS コミュニティやオフラインイベントの情報を提示する。
- **SNS シェア機能**: 診断結果やクエスト達成を SNS で簡単にシェアできる機能。
- **AI の回答精度の向上**: ユーザーのチャット履歴やクエスト進捗を考慮し、よりパーソナライズされたアドバイスを生成する。
