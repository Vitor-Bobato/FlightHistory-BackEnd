Este é o backend do desafio FlightHistory. Aqui deixei uma API simples em Node.js + Express escrita em TypeScript que serve os dados do arquivo JSON de histórico de voos.

Resumo do que tem aqui
- Node.js + Express
- TypeScript
- Dados estáticos: `src/data/flightHistory.json`
- Endpoints principais:
  - `GET /flights` → lista de voos (suporta paginação com ?page=&limit=)
  - `GET /flights/:id` → detalhes completos de um voo
  - `GET /flights/total/balance` → (opcional) saldo total acumulado

Requisitos
- Node 16+ (ou versão estável compatível)
- npm ou yarn

Como rodar (modo desenvolvimento)
1. Abra um terminal e vá para a pasta do backend:
   - cd FlightHistory-BackEnd
2. Instale dependências:
   - npm install
3. Rode em modo de desenvolvimento (auto-reload com ts-node-dev):
   - npm run dev
4. O servidor por padrão irá rodar em:
   - http://localhost:4000

Testes rápidos
- Abra no navegador ou use curl:
  - http://localhost:4000/flights
  - http://localhost:4000/flights/FL-001
  - http://localhost:4000/flights/total/balance

Notas sobre código
- O arquivo de entrada está em `src/data/flightHistory.json`. O controller lê esse arquivo e expõe os dados pela API.
- O projeto inclui paginação simples (query params `page` e `limit`) na rota `/flights`.
- CORS está habilitado para permitir chamadas do frontend.

Feito por:
- Vitor-Bobato
