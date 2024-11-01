# Rhythmate-Service

ゲーム感覚で習慣化を楽しめるサービス**Rhythmate**のバックエンドです。  
フロントエンドのリポジトリは [https://github.com/taga3s/Rhythmate-Web](https://github.com/taga3s/Rhythmate-Web) へ

## 開発期間
- 2024/02 - 2024/05

## 主な技術スタック

- 言語
  - TypeScript

- フレームワーク・ライブラリ
  - Express
  - Prisma

- DB
  - PostgreSQL
  - Firebase Storage 

- ツール
  - biome
  - jest

- PaaS
  - koyeb

- その他
  - Gemini API
  - micro cms

## 環境構築

### 前提

1. パッケージ管理に`pnpm`を利用するので、有効化します。

```
$ corepack enable pnpm
```

2. `node_modules` をインストールする。

```
$ pnpm i
```

3. `.env.example`をコピーして`.env`配置する。（値は管理人に尋ねること。）

```
cp .env.example .env
```

### express サーバーを立ち上げる

`http://localhost:3000`で立ち上がります。

```
$ pnpm run start:watch
```

ヘルスチェックのエンドポイントを叩き、サーバー及び DB が起動しているか確認します。

```
$ curl http://localhost:3000/v1/health
{"status":"ok","message":"Successfully connected to db"}
```

### postgresql を起動する

docker がインストールされていることを前提とします。

1. コンテナを起動する。

```
$ make run
```

もしくは

```
$ docker compose up -d
```

2. コンテナに接続し、ログインする

```
$ make it-db
$ psql -U rhyth_user -d rhyth_db
```

### prisma の操作

- マイグレーションを行いたい時

```
$ pnpm run migrate
```

- DB をリセットして、マイグレーションを行いたい時

```
$ pnpm run migrate:reset
```

- prisma studio を立ち上げたい時

```
$ pnpm run studio
```
