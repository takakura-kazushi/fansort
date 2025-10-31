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

## 7. 今後の追加予定機能

### 7.1. 趣味データベースの拡充

**対象ファイル**: `src/app/result/page.tsx`

**概要**:
現在 7 つの趣味カテゴリのみですが、より多様なユーザーのニーズに応えるため、趣味の選択肢を大幅に拡充します。

**実装内容**:

- 趣味カテゴリを 20〜30 種類に増加
- 各カテゴリの詳細情報（難易度、費用、魅力ポイント）を充実
- 趣味のタグ付け機能（アクティブ系、クリエイティブ系、学習系など）

**優先度**: 🔴 高

---

### 7.2. AI キャラクター選択機能

**対象ファイル**: `src/app/api/chat/route.ts`, `src/app/chat/page.tsx`, 新規コンポーネント

**概要**:
ユーザーが自分の好みに合わせて AI の「先輩キャラクター」を選択できる機能を追加します。キャラクターごとに異なる話し方や回答スタイルで、より親しみやすいチャット体験を提供します。

**実装内容**:

- **キャラクター設定**:
  - 例: 「熱血先輩」「優しいお姉さん」「クールな先輩」「フレンドリーな友達」など
  - 各キャラクターに専用のシステムプロンプトと口調を設定
- **API 側の変更** (`route.ts`):
  - キャラクター ID を受け取るパラメータを追加
  - キャラクターごとのプロンプト生成関数を実装
- **フロントエンド実装** (`chat/page.tsx`):
  - チャット開始時にキャラクター選択モーダルを表示
  - 選択したキャラクターの情報を API リクエストに含める
  - チャット画面にキャラクターのアバター/アイコンを表示
- **新規コンポーネント**:
  - `src/components/CharacterSelectModal.tsx`: キャラクター選択用のモーダル
  - `src/components/CharacterAvatar.tsx`: チャット画面でのキャラクター表示

**優先度**: 🟡 中

---

### 7.3. 診断問題数のカスタマイズ

**対象ファイル**: `src/app/diagnosis/page.tsx`

**概要**:
ユーザーが診断にかける時間や精度の希望に応じて、質問数を選択できるようにします。

**実装内容**:

- **診断開始前の選択画面**:
  - 5 問モード（所要時間: 約 1 分）: クイック診断
  - 10 問モード（所要時間: 約 3 分）: バランス型（デフォルト）
  - 20 問モード（所要時間: 約 5 分）: 詳細診断
- **各モードの質問設計**:
  - 5 問: 基本的な志向のみを診断
  - 10 問: 現在の実装（ライフスタイルと価値観）
  - 20 問: より詳細なパーソナリティ分析を含む
- **選択状態の管理**:
  - URL パラメータまたは状態管理で選択したモードを保持
  - 結果ページで診断モードを表示

**優先度**: 🟢 低

---

### 7.4. 診断ロジックの高度化

**対象ファイル**: `src/app/result/page.tsx`, 新規ファイル `src/lib/diagnosticLogic.ts`

**概要**:
現在のシンプルな「最頻値」ベースの診断から、より精緻なアルゴリズムへ改善します。

**実装内容**:

- **スコアリングシステム**:
  - 各質問に重み付けを設定
  - 趣味ごとに適合度スコアを計算
  - 複数の趣味を相性順にランキング表示
- **多面的な分析**:
  - アクティブ度、社交性、創造性、学習意欲などの複数の軸で評価
  - ユーザープロフィールを数値化し、趣味データベースとマッチング
- **パーソナライズ**:
  - 回答パターンから潜在的な興味も推測
  - 「意外な趣味」も候補として提案
- **ロジックの分離**:
  - 診断アルゴリズムを専用のユーティリティファイルに分離
  - テストしやすく、メンテナンスしやすい構造に

**実装例**:

```typescript
// src/lib/diagnosticLogic.ts
interface UserProfile {
  activeLevel: number; // 0-10
  socialLevel: number; // 0-10
  creativityLevel: number; // 0-10
  learningLevel: number; // 0-10
}

function calculateHobbyMatch(
  userProfile: UserProfile,
  hobby: HobbyData
): number {
  // スコアリングロジック
}
```

**優先度**: 🔴 高

---

## 8. 技術的な改善予定

- **状態管理の最適化**: Context API または Zustand の導入
- **型安全性の向上**: API レスポンスの型定義強化
- **エラーハンドリング**: より詳細なエラーメッセージとリトライ機能
- **パフォーマンス最適化**: コード分割とレイジーローディング
- **テストの追加**: ユニットテストと E2E テストの実装

---

## 9. 将来的な拡張アイデア

- ユーザーアカウント機能（診断履歴の保存）
- チャット履歴の保存と振り返り
- 趣味コミュニティへの誘導機能
- 目標（クエスト）設定と進捗管理
- SNS シェア機能
