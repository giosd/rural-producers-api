# 🌾 Rural Producers API

API REST para gerenciamento de produtores rurais, suas fazendas e culturas, com dashboard de estatísticas, documentação via Swagger e testes automatizados. Desenvolvido com **NestJS**, **TypeScript**, **TypeORM**, **PostgreSQL** e **Docker**.

---

## 🚀 Tecnologias

- Node.js + TypeScript
- NestJS
- PostgreSQL
- TypeORM
- Docker + Docker Compose
- Jest (testes unitários/integrados)
- Swagger (OpenAPI)

---

## 📦 Requisitos

- Node.js 18+
- Docker + Docker Compose

---

## ▶️ Como rodar com Docker

````bash
# Clonar o projeto
git clone https://github.com/giosd/rural-producers-api.git
cd rural-producers-api

# Subir a aplicação e o banco
docker-compose up --build

A API estará disponível em:
👉 http://localhost:3000

---

## 📚 Documentação Swagger

Acesse:
👉 [`http://localhost:3000/api`](http://localhost:3000/api)

---

## 🧪 Testes

```bash
# Unitários e integrados
npm run test

# Cobertura
npm run test:cov
````

---

## 📊 Dashboard

- Total de fazendas cadastradas
- Soma total de hectares
- Gráficos de pizza:
  - Por estado
  - Por cultura
  - Por uso do solo (agricultável x vegetação)

Rotas disponíveis:

- `GET /dashboard/farms-count`
- `GET /dashboard/total-area`
- `GET /dashboard/by-state`
- `GET /dashboard/by-culture`
- `GET /dashboard/land-usage`

---

## 📁 Estrutura do Projeto

```
src/
├── app.module.ts
├── dashboard/
│   ├── dashboard.controller.ts
│   └── dashboard.service.ts
├── producers/
│   ├── dto/
│   ├── entities/
│   ├── producers.controller.ts
│   └── producers.service.ts
├── farms/
├── crops/
└── validators/
```

---

## 🛠 Scripts úteis

```bash
npm run start         # Produção
npm run start:dev     # Desenvolvimento com hot-reload
npm run test          # Rodar testes
npm run test:cov      # Cobertura de testes
```

---
