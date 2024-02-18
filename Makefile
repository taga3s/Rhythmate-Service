.PHONY: run
run: run-db

.PHONY: run-db
run-db:
	docker compose up -d

.PHONY: it-db
it-db: #dbコンテナに接続
	docker exec -it rhythmate_db /bin/bash