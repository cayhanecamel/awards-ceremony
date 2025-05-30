# awards-ceremony

# 🏆 表彰Webサービス

入力内容に従って表彰画面を生成し、expire機能付きURLで共有できるインタラクティブWebサービス

## ✨ 主要機能

- **📝 入力画面**: 表彰情報作成（SSG）
- **🎭 表彰画面**: インタラクティブ表彰発表（SPA）
- **🔗 URL管理**: 有効期限付きURL自動生成
- **🎵 音響演出**: ドラムロール・ファンファーレ付き
- **🎉 視覚効果**: 紙吹雪・光彩エフェクト

## 🎯 インタラクティブ発表システム

### クリック操作フロー
1. **1回目クリック**: ドラムロール開始 🥁
2. **2回目クリック**: 3位発表 + ドラムロール停止 🥉
3. **3回目クリック**: ドラムロール開始 🥁
4. **4回目クリック**: 2位発表 + ドラムロール停止 🥈
5. **5回目クリック**: ドラムロール開始 🥁
6. **6回目クリック**: 1位発表 + ドラムロール停止 + ファンファーレ + 紙吹雪 🥇🎉

## 🛠️ 技術スタック

### フロントエンド
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (アニメーション)
- **Tone.js** (音響制御)
- **shadcn/ui** (UIコンポーネント)

### バックエンド・インフラ
- **Vercel** (ホスティング)
- **Supabase** (PostgreSQL + Auth)
- **PostgreSQL** (JSONB型活用)

### レンダリング戦略
- **入力画面**: SSG (SEO最適化)
- **表彰画面**: SPA (コスト削減・インタラクティブ重視)

## リポジトリ構成
```
award-app/
├── README.md                        # プロジェクト仕様・セットアップガイド
├── app/                              # Next.js App Router
│   ├── create/page.tsx              # 入力画面（SSG）
│   ├── award/[slug]/
│   │   ├── page.tsx                 # 表彰画面シェル（静的）
│   │   ├── loading.tsx              # ローディング画面
│   │   └── not-found.tsx            # 404/期限切れページ
│   ├── api/
│   │   ├── awards/route.ts          # 作成API
│   │   └── awards/[slug]/route.ts   # データ取得API
│   ├── globals.css                  # Tailwind CSS
│   └── layout.tsx                   # ルートレイアウト
├── components/
│   ├── ui/                          # shadcn/ui components
│   ├── AwardForm.tsx               # 入力フォーム（CSR）
│   ├── AwardReveal.tsx             # 表彰アニメーション（CSR）
│   ├── AwardShell.tsx              # 表彰画面コンテナ
│   ├── AwardLoading.tsx            # ローディングコンポーネント
│   ├── DrumrollEffect.tsx          # ドラムロール演出
│   ├── ConfettiEffect.tsx          # 紙吹雪エフェクト
│   └── SoundManager.tsx            # 音響制御
├── lib/
│   ├── supabase.ts                 # Supabase client
│   ├── database.types.ts           # 自動生成型定義
│   ├── audio.ts                    # 音響ユーティリティ
│   └── utils.ts                    # ユーティリティ関数
├── public/
│   └── sounds/                     # 音響ファイル
│       ├── drumroll.mp3
│       └── fanfare.mp3
├── supabase/                       # DB管理
│   ├── config.toml                 # Supabase設定
│   ├── seed.sql                    # 開発用テストデータ
│   ├── migrations/                 # マイグレーションファイル
│   │   ├── 20250528000001_create_awards_table.sql
│   │   ├── 20250528000002_setup_rls_policies.sql
│   │   └── 20250528000003_add_cron_job.sql
│   └── functions/                  # Edge Functions（将来拡張用）
├── scripts/
│   ├── db-reset.sh                 # ローカルDB初期化
│   └── db-deploy.sh                # 本番デプロイ
├── .env.local                      # 環境変数
├── .env.example                    # 環境変数テンプレート
└── package.json
```

## 🗄️ データベース設計

### メインテーブル
```sql
CREATE TABLE awards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug varchar(50) UNIQUE NOT NULL,           -- URL用一意識別子
  title varchar(255) NOT NULL,                -- 表彰タイトル
  description text,                           -- 説明文
  winners jsonb NOT NULL,                     -- 受賞者データ（JSONB型）
  created_at timestamp with time zone DEFAULT now(),
  expires_at timestamp with time zone,        -- 有効期限
  created_by uuid REFERENCES auth.users(id),  -- 作成者
  view_count integer DEFAULT 0,              -- 閲覧数
  is_public boolean DEFAULT true             -- 公開設定
);
```

### 自動削除機能
```sql
-- pg_cron拡張で期限切れデータを自動削除
SELECT cron.schedule(
  'cleanup-expired-awards',
  '0 * * * *',  -- 毎時実行
  'DELETE FROM awards WHERE expires_at < now()'
);
```

## 🚀 セットアップ

### 前提条件
- Node.js 18+
- npm または yarn
- Supabase CLI

### 初期セットアップ

#### 1. Supabase CLIインストール (macOS)
```bash
# Homebrew経由でインストール
brew install supabase/tap/supabase

# インストール確認
supabase --version
```

#### 2. Dockerセットアップ
```bash
# Docker Desktop をインストール (必須)
# https://docs.docker.com/desktop/mac/

# Docker動作確認
docker --version
docker-compose --version
```

#### 3. プロジェクトセットアップ
```bash
# 1. プロジェクトクローン
git clone <repository-url>
cd award-app

# 2. 依存関係インストール
npm install

# 3. Supabase初期化
supabase init

# 4. Supabaseローカル環境起動
supabase start
# 初回は Docker イメージダウンロードで時間がかかります

# 出力例:
# Started supabase local development setup.
#          API URL: http://localhost:54321
#           DB URL: postgresql://postgres:postgres@localhost:54322/postgres
#       Studio URL: http://localhost:54323
#         Anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
# Service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### 4. 環境変数設定
```bash
# 環境変数ファイル作成
cp .env.example .env.local

# .env.local に supabase start の出力結果を設定:
# NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
# NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key>
# SUPABASE_SERVICE_ROLE_KEY=<service_role_key>
# NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### 5. データベースセットアップ
```bash
# マイグレーション全適用
npm run db:reset

# 型定義生成
npm run db:types

# テストデータ確認 (Supabase Studio)
open http://localhost:54323
```

#### 6. 開発サーバー起動
```bash
npm run dev

# アプリケーション確認
open http://localhost:3000
```

### 環境変数設定 (.env.local)
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Vercel (本番環境)
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

## 📜 スクリプト

```bash
# 開発
npm run dev                 # 開発サーバー起動
npm run build              # 本番ビルド
npm run start              # 本番サーバー起動

# データベース管理
npm run db:start           # Supabaseローカル起動
npm run db:stop            # Supabaseローカル停止
npm run db:reset           # データベースリセット
npm run db:diff            # スキーマ差分生成
npm run db:push            # マイグレーション適用
npm run db:types           # 型定義生成
npm run db:deploy          # 本番デプロイ
npm run db:seed            # テストデータ投入

# ユーティリティ
npm run lint               # ESLint実行
npm run type-check         # TypeScript型チェック
```

## 🏗️ プロジェクト構成

### コンポーネント設計
```
components/
├── ui/                    # 再利用可能なUIコンポーネント
├── AwardForm.tsx         # 表彰作成フォーム
├── AwardReveal.tsx       # メイン表彰画面
├── AwardShell.tsx        # 表彰画面コンテナ
├── DrumrollEffect.tsx    # ドラムロール視覚効果
├── ConfettiEffect.tsx    # 紙吹雪エフェクト
└── SoundManager.tsx      # 音響制御
```

### API設計
```
/api/awards              POST   # 新規表彰作成
/api/awards/[slug]       GET    # 表彰データ取得
```

### ページ構成
```
/                        # ランディングページ
/create                  # 表彰作成画面
/award/[slug]           # 表彰発表画面
```

## 🎨 UI/UX仕様

### 表彰画面の視覚効果
- **ドラムロール**: 画面振動 + ドラムロール音
- **カード登場**: スライドイン + 効果音
- **1位発表**: ファンファーレ + 紙吹雪 + 光彩エフェクト

### カードデザイン
- **1位**: 金色グラデーション、特大サイズ、王冠アイコン
- **2位**: 銀色グラデーション、大サイズ、メダルアイコン
- **3位**: 銅色グラデーション、中サイズ、リボンアイコン

## 💰 コスト構成

### 月間10万PV想定
- **Vercel Pro**: $20/月
- **Supabase**: $0-25/月（Free → Pro）
- **合計**: $20-45/月

### SPA採用効果
- SSR比較で約$60/月削減
- 年間$720のコスト削減

## 🔒 セキュリティ

### データベースセキュリティ
```sql
-- Row Level Security有効化
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;

-- 公開・有効期限内のデータのみ閲覧可能
CREATE POLICY "awards_select_policy" ON awards
  FOR SELECT USING (
    is_public = true 
    AND (expires_at IS NULL OR expires_at > now())
  );
```

### 追加セキュリティ対策
- 匿名認証による安全な利用
- 有効期限による自動データ削除
- HTTPS強制暗号化

## 📊 開発ワークフロー

### 機能追加の流れ
1. フィーチャーブランチ作成
2. 開発・テスト
3. データベース変更時は`npm run db:diff`
4. `npm run db:types`で型定義更新
5. プルリクエスト作成
6. レビュー・マージ
7. 自動デプロイ実行

### デプロイフロー
- **開発環境**: `git push` → Vercel Preview
- **本番環境**: `main`ブランチマージ → 自動デプロイ
- **データベース**: `npm run db:deploy`で手動デプロイ

## 🧪 テスト

### テストデータ
```bash
# テストデータ投入
npm run db:seed

# テスト用表彰URL
http://localhost:3000/award/test-award-1
```

### ローカルテスト環境
- Supabaseローカル環境でDB完全再現
- 音響ファイルの動作確認
- レスポンシブデザイン確認

## 🚦 トラブルシューティング

### よくある問題

**Supabaseローカル環境でポート競合エラー**
```bash
# ポート使用状況確認
lsof -i :54321
lsof -i :54322

# Supabase再起動
supabase stop
supabase start
```

**音響が再生されない**
```bash
# ブラウザの自動再生ポリシーが原因
# 初回ユーザーインタラクション後に音響初期化
```

**型エラーが発生する**
```bash
# 型定義を最新化
npm run db:types
```

**マイグレーションエラー**
```bash
# ローカルDBをリセット
npm run db:reset
```

**Docker関連エラー**
```bash
# Docker状態確認
docker ps
docker system df

# Dockerリソース解放
docker system prune

# Supabase強制再起動
supabase stop
supabase start
```

## 📈 ロードマップ

### Phase 2 (v2.0)
- [ ] カスタム音響ファイルアップロード
- [ ] 動的OGP生成
- [ ] 統計ダッシュボード
- [ ] カスタムテーマ

### Phase 3 (v3.0)
- [ ] リアルタイム共有表彰
- [ ] 録画機能
- [ ] 外部API連携
- [ ] 多言語対応

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチ作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエスト作成

## 📝 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルを参照

## 👥 作成者

- **開発チーム** - 初期開発
- **プロジェクト管理** - 仕様策定・進行管理

## 🙏 謝辞

- Next.js チーム
- Supabase チーム
- Framer Motion コミュニティ
- shadcn/ui プロジェクト

---

**🏆 感動的な表彰体験を、テクノロジーで実現します 🎉**