# Rhythmate-Service

## 概要

Rhythmate のバックエンドです。

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

- prisma studio を立ち上げたい時

```
$ npm run studio
```
