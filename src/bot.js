const TelegramBot = require('node-telegram-bot-api');

// Token falso apenas para o código não ficar vazio (e o eslint/testes passarem)
const token = process.env.TELEGRAM_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN_HERE';

function initBot() {
  if (process.env.NODE_ENV !== 'test') {
    const bot = new TelegramBot(token, { polling: true });

    bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      bot.sendMessage(chatId, 'Olá! O bot de CI/CD está funcionando.');
    });

    return bot;
  }
  return null;
}

initBot();

module.exports = { initBot };
