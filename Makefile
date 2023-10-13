up:
	docker compose up -d

down:
	docker compose down

install:
	docker compose exec nodejs npm install

dev:
	docker compose exec nodejs npm run dev