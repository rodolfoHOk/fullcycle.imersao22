# Imersão FullStack && FullCycle 22 - Gateway de Pagamento - Antifraude (Nest.js)

> Evento da FullCycle / CodeEdu - projeto do Antifraude em Nest.js

## Tecnologias

- Typescript / Javascript
- Nest.js
- Prisma ORM
- PostgreSQL
- REST

## Guia

### Teste service sem interface REST

- npm run start:dev -- --entryFile repl
- await get(FraudService).processInvoice({invoice_id: '1', account_id: '1', amount: 100})

## Rodar o projeto

### Requisitos

- Node.js (instalado)

### Comandos

- git clone https://github.com/rodolfoHOk/fullcycle.imersao22
- cd nestjs-anti-fraud
- docker compose up -d
- npm install
- npm run start:dev

## Projetos

- [Readme Geral](../README.md)

- [API Gateway Go](../go-gateway-api/README.md)

- [FrontEnd Next.js](../nextjs-frontend/README.md)

- [Antifraude Nest.js](#imersão-fullstack--fullcycle-22---gateway-de-pagamento---antifraude-nestjs)
