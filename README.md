# Imersão FullStack && FullCycle 22 - Gateway de Pagamento

> Evento da FullCycle / CodeEdu

## Principais Tecnologias

- Go Lang
- Nest.js
- Next.js
- Apache Kafka
- Docker
- IA usando Cursor, Task Master, UX Pilot e v0

## Introdução

### Sobre o Projeto

Este projeto foi desenvolvido durante a Imersão Full Stack & Full Cycle, onde construímos um Gateway de Pagamento completo utilizando arquitetura de microsserviços.

O objetivo é demonstrar a construção de um sistema distribuído moderno, com separação de responsabilidades, comunicação assíncrona e análise de fraudes em tempo real.

### Arquitetura Geral

![Projects 01](/files/projects-01.png)

### Componentes do Sistema

- Frontend (Next.js)

  - Interface do usuário para gerenciamento de contas e processamento de pagamentos
  - Desenvolvido com Next.js para garantir performance e boa experiência do usuário

- Gateway (Go)

  - Sistema principal de processamento de pagamentos
  - Gerencia contas, transações e coordena o fluxo de pagamentos
  - Publica eventos de transação no Kafka para análise de fraude

- Apache Kafka

  - Responsável pela comunicação assíncrona entre API Gateway e Antifraude
  - Garante confiabilidade na troca de mensagens entre os serviços
  - Tópicos específicos para transações e resultados de análise

- Antifraude (Nest.js)
  - Consome eventos de transação do Kafka
  - Realiza análise em tempo real para identificar possíveis fraudes
  - Publica resultados da análise de volta no Kafka

### Fluxo de Comunicação

- Frontend realiza requisições para a API Gateway via REST
- Gateway processa as requisições e publica eventos de transação no Kafka
- Serviço Antifraude consome os eventos e realiza análise em tempo real
- Resultados das análises são publicados de volta no Kafka
- Gateway consome os resultados e finaliza o processamento da transação

## Links úteis

- [Cursor](https://www.cursor.com/)

- [Task Master AI - Github](https://github.com/eyaltoledano/claude-task-master)

- [UX Pilot](https://uxpilot.ai/)

- [v0](https://v0.dev/)

## Projetos

- [Readme Geral](#imersão-fullstack--fullcycle-22---gateway-de-pagamento)

- [API Gateway Go](/go-gateway-api/README.md)

- [FrontEnd Next.js](/nextjs-frontend/README.md)

- [Antifraude Nest.js](/nestjs-anti-fraud/README.md)
