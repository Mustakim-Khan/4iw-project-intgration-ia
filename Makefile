up:
	docker compose up -d

down:
	docker compose down -v

install:
	docker compose exec nodejs npm install

dev: install
	docker compose exec nodejs npm run dev

next_secret:
	openssl rand -base64 32

bash:
	docker compose exec nodejs /bin/sh