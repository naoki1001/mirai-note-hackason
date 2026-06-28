# Mirai Note - 開発ガイドライン

## 📚 関連ドキュメント
プロジェクトの要件、コンセプト、画面設計については以下のドキュメントを必ず参照すること。
- 仕様書: `docs/SPEC.md`

## 🛠 技術スタック
- Frontend: React 18, Vite, TypeScript
- Package Manager: pnpm
- Environment: Docker Compose (Node.js 22-slim)
- Styling: Tailwind CSS (レイアウト/ユーティリティ) + Material UI (リッチなUIコンポーネント)
- Icons: lucide-react, @mui/icons-material
- Animation: Framer Motion
- Storage: localStorage

## 💻 開発コマンド
開発はすべてDockerコンテナ内で `pnpm` を使用して実行すること。ホスト側で直接 `npm` や `pnpm` を実行しないこと。
- **開発サーバー起動:** `docker compose up -d`
- **ログ確認:** `docker compose logs -f app`
- **パッケージ追加:** `docker compose run --rm app pnpm add <package>`

## ✍️ コーディングルール・制約
1. **MUIとTailwindの使い分け:**
   - ボタン、フォーム、ダイアログなどのインタラクティブなコンポーネントはMUIを優先して使用する。
   - レイアウト（flex, grid, margin, padding）やフォントサイズなどのスタイリングにはTailwindのクラスを使用する。
2. **デザインテーマ（「50年後」を見据えたクリーンな未来感）:**
   - クリーンで希望に満ちた「ソーラーパンク / グラスモーフィズム」を視覚表現のコアとする。
   - 白・淡い透明感をベースとしつつ、アクセントには鮮やかなホログラムグラデーションを使用する。
   - すりガラス効果（`backdrop-blur`）を取り入れ、洗練された未来のデバイスUIに触れているかのような体験を作る。
3. **アニメーションの実装 (Framer Motion):**
   - 状態変化やタイムカプセル開封時には、ブラー解除や発光などの滑らかで劇的なエフェクトを実装する。
4. **日付と時間の扱い (最重要):**
   - デモ用の「タイムスキップ機能」を実現するため、現在時刻の取得に標準の `Date.now()` を直接使用してはならない。
   - 必ず `useTime` 等のカスタムフック経由で「仮想現在時刻」を取得し、それに基づいてUIの出し分け（封印/開封）を行うこと。
5. **UIの分割:**
   - コンポーネントは適切に分割して `src/components/` に配置する。