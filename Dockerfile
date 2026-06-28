FROM node:24-slim

# pnpmの有効化
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Viteのデフォルトポート
EXPOSE 5173

# ホスト側からのアクセスを許可して起動
CMD ["pnpm", "run", "dev", "--host", "0.0.0.0"]