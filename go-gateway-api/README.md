# Imersão FullStack && FullCycle 22 - Gateway de Pagamento - API Gateway (Go)

> Evento da FullCycle / CodeEdu - projeto da API Gateway em Go

## Tecnologias

- Go
- Chi
- PostgreSQL
- Docker

## Introdução

### Arquitetura do Projeto da API Gateway

![Projects 02](../files/projects-02.png)

![Projects 03](../files/projects-03.png)

## Guias

### Comandos para golang-migrate

- instalar: go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
- executar migrations: migrate -path db/migrations -database "postgresql://postgres:postgres@localhost:5432/gateway?sslmode=disable" up

## Rodar o projeto

### Requisitos

- Go lang (instalado)
- Git (instalado)
- Docker e Docker Compose (instalados)

### Comandos

- git clone https://github.com/rodolfoHOk/fullcycle.imersao22
- cd go-gateway-api
- cp .env.example .env
- docker compose up -d
- go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
- migrate -path db/migrations -database "postgresql://postgres:postgres@localhost:5432/gateway?sslmode=disable" up
- go run cmd/app/main.go

## API Endpoints

### Criar Conta
```http
POST /accounts
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@doe.com"
}
```
Retorna os dados da conta criada, incluindo o API Key para autenticação.

### Consultar Conta
```http
GET /accounts
X-API-Key: {api_key}
```
Retorna os dados da conta associada ao API Key.

### Criar Fatura
```http
POST /invoice
Content-Type: application/json
X-API-Key: {api_key}

{
    "amount": 100.50,
    "description": "Compra de produto",
    "payment_type": "credit_card",
    "card_number": "4111111111111111",
    "cvv": "123",
    "expiry_month": 12,
    "expiry_year": 2025,
    "cardholder_name": "John Doe"
}
```
Cria uma nova fatura e processa o pagamento. Faturas acima de R$ 10.000 ficam pendentes para análise manual.

### Consultar Fatura
```http
GET /invoice/{id}
X-API-Key: {api_key}
```
Retorna os dados de uma fatura específica.

### Listar Faturas
```http
GET /invoice
X-API-Key: {api_key}
```
Lista todas as faturas da conta.

## Testando a API

O projeto inclui um arquivo `test.http` que pode ser usado com a extensão REST Client do VS Code. Este arquivo contém:
- Variáveis globais pré-configuradas
- Exemplos de todas as requisições
- Captura automática do API Key após criação da conta

Para usar:
1. Instale a extensão REST Client no VS Code
2. Abra o arquivo `test.http`
3. Clique em "Send Request" acima de cada requisição


## Projetos

- [Readme Geral](../README.md)

- [API Gateway Go](#imersão-fullstack--fullcycle-22---gateway-de-pagamento---api-gateway-go)

- [FrontEnd Next.js](../) - em breve

- [Antifraude Nest.js](../) - em breve
