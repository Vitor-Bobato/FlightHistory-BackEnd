````markdown name=pilops-backend/README-backend.md
# Pilops Backend

Requisitos:
- Node 16+ / npm

Como rodar em desenvolvimento:
1. cd pilops-backend
2. npm install
3. npm run dev
4. disponível em http://localhost:4000

Endpoints:
- GET /flights?page=1&limit=12  -> lista de voos (paginada)
- GET /flights/:id              -> detalhes do voo
- GET /flights/total/balance    -> saldo total acumulado