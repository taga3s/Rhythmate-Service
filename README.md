# Rhythmate-Service

ゲーム感覚で習慣化を楽しめるサービス**Rhythmate**のバックエンドです。  
フロントエンドは[こちら](https://github.com/ayanami77/Rhythmate-Web)

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

1. npm モジュールをインストールする。

```
$ npm i
```

2. `.env.example`をコピーして`.env`を配置する。

```
$ cp .env.example .env
```

### express サーバーを立ち上げる

`http://localhost:3000`で立ち上がります。

```
$ npm run start:watch
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
$ npm run migrate
```

- DB をリセットして、マイグレーションを行いたい時

```
$ npm run migrate:reset
```

- prisma studio を立ち上げたい時

```
$ npm run studio
```
