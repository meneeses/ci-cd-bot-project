const TelegramBot = require('node-telegram-bot-api');
const { simpleGreeting, isCommand } = require('./botLogic');

// O token vem das variáveis de ambiente (para segurança e CI/CD)
const token = process.env.TELEGRAM_TOKEN;

if (!token) {
    console.warn("AVISO: TELEGRAM_TOKEN não configurado. Se estiver rodando os testes, ignore isso. O bot irá sair na execução normal.");
    if (require.main === module) {
        process.exit(1);
    }
}

// Só inicializa de verdade se rodar como arquivo principal para os testes passarem de boa sem token real
if (require.main === module) {
    const bot = new TelegramBot(token, { polling: true });

    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;

        if (isCommand(text)) {
            bot.sendMessage(chatId, "Bip bop! Você enviou um comando!");
        } else {
            bot.sendMessage(chatId, simpleGreeting(msg.from.first_name));
        }
    });

    console.log("Bot iniciado com sucesso e escutando mensagens...");
}
