# Projeto de CI/CD - Telegram Bot 🤖🚀

Este é um projeto simples construído em **Node.js** para o trabalho prático da disciplina de DevOps da PUCPR. 
A ideia principal é construir a automação e integração contínua por cima de uma aplicação real.

## 🎯 O que este projeto faz?
É a base de um bot do Telegram com **Testes Unitários (Jest)** atrelada à um pipeline de **Integração Contínua (CI) usando GitHub Actions**. 
Toda vez que é feito um "Push" ou aberto um "Pull Request", o ambiente do GitHub:
- Realiza o Checkout de todo o código
- Instala o NodeJS nativamente
- Resolve as dependências (com caching de NPM para otimização do CI)
- Roda os Testes para validar se a aplicação não sofreu quebras.

## 💻 Como rodar e testar o projeto localmente?

1. Instale as dependências com NPM:
   ```bash
   npm install
   ```

2. Rode os testes manualmente:
   ```bash
   npm test
   ```

3. (Opcional) Crie um arquivo ou exporte nas variáveis de ambiente o `TELEGRAM_TOKEN` contendo o token do BotFather e inicialize o bot:
   ```bash
   node src/bot.js
   ```

## 🛠️ Tecnologias Utilizadas
- **Node.js**
- **Jest** - Framwork de testes.
- **Node-Telegram-Bot-Api** - Biblioteca de comunicação do Bot.
- **GitHub Actions** - Nosso orquestrador de CI!
