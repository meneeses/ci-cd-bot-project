const TelegramBot = require('node-telegram-bot-api');

// Token falso apenas para fallback de ambiente
const token = process.env.TELEGRAM_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN_HERE';

/**
 * Valida se o formato do token do Telegram é válido
 * @param {string} tok 
 * @returns {boolean}
 */
function validateToken(tok) {
  if (!tok || typeof tok !== 'string') return false;
  if (tok === 'YOUR_TELEGRAM_BOT_TOKEN_HERE') return false;
  const tokenRegex = /^\d{8,10}:[A-Za-z0-9_-]{35}$/;
  return tokenRegex.test(tok);
}

/**
 * Formata mensagem de boas-vindas
 * @param {string} [userName] 
 * @returns {string}
 */
function formatWelcomeMessage(userName) {
  const name = (userName && userName.trim()) ? userName.trim() : 'usuário';
  return `Olá, ${name}! Bem-vindo ao bot de CI/CD da PUCPR.`;
}

/**
 * Retorna mensagem de ajuda com os comandos disponíveis
 * @returns {string}
 */
function formatHelpMessage() {
  return [
    '📌 Comandos disponíveis:',
    '/start - Inicia a interação com o bot',
    '/help - Exibe esta mensagem de ajuda',
    '/status - Exibe o status e tempo de atividade do bot',
    '/calc <num1> <op> <num2> - Executa operações matemáticas (+, -, *, /)',
    '/echo <texto> - Repete a mensagem enviada'
  ].join('\n');
}

/**
 * Realiza cálculos matemáticos básicos de forma segura
 * @param {number} num1 
 * @param {string} operator 
 * @param {number} num2 
 * @returns {number|string}
 */
function calculate(num1, operator, num2) {
  const n1 = Number(num1);
  const n2 = Number(num2);

  if (isNaN(n1) || isNaN(n2)) {
    return 'Erro: Números inválidos';
  }

  switch (operator) {
    case '+':
      return n1 + n2;
    case '-':
      return n1 - n2;
    case '*':
      return n1 * n2;
    case '/':
      if (n2 === 0) return 'Erro: Divisão por zero não é permitida';
      return n1 / n2;
    default:
      return `Erro: Operador '${operator}' não suportado`;
  }
}

/**
 * Formata a quantidade de segundos em formato legível
 * @param {number} seconds 
 * @returns {string}
 */
function formatUptime(seconds) {
  if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) {
    return '0s';
  }

  const s = Math.floor(seconds);
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const remainingSeconds = s % 60;

  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  parts.push(`${remainingSeconds}s`);

  return parts.join(' ');
}

/**
 * Faz o parsing de um texto para identificar comando e argumentos
 * @param {string} text 
 * @returns {{ command: string, args: string[] }}
 */
function parseCommand(text) {
  if (!text || typeof text !== 'string') {
    return { command: '', args: [] };
  }

  const parts = text.trim().split(/\s+/);
  const command = parts[0] || '';
  const args = parts.slice(1);

  return { command, args };
}

/**
 * Processa um texto recebido e retorna a resposta adequada
 * @param {string} text 
 * @param {object} [user] 
 * @returns {string}
 */
function processMessage(text, user = {}) {
  const { command, args } = parseCommand(text);
  const userName = user.first_name || user.username || '';

  switch (command.toLowerCase()) {
    case '/start':
      return formatWelcomeMessage(userName);
    case '/help':
      return formatHelpMessage();
    case '/status':
      return `🟢 Bot online!\nTempo de execução: ${formatUptime(process.uptime())}\nAmbiente: ${process.env.NODE_ENV || 'development'}`;
    case '/calc':
      if (args.length < 3) {
        return 'Uso correto: /calc <número1> <+|-|*|/> <número2>';
      }
      return `Resultado: ${calculate(args[0], args[1], args[2])}`;
    case '/echo':
      return args.length > 0 ? args.join(' ') : 'Nada para repetir.';
    default:
      return 'Comando não reconhecido. Digite /help para ver os comandos disponíveis.';
  }
}

/**
 * Inicializa o bot do Telegram caso não esteja em ambiente de teste
 */
function initBot() {
  if (process.env.NODE_ENV !== 'test') {
    if (!validateToken(token)) {
      console.warn('⚠️ Token do Telegram não configurado ou inválido. O polling não será iniciado.');
      return null;
    }

    const bot = new TelegramBot(token, { polling: true });

    bot.on('message', (msg) => {
      if (msg.text) {
        const reply = processMessage(msg.text, msg.from);
        bot.sendMessage(msg.chat.id, reply);
      }
    });

    return bot;
  }
  return null;
}

initBot();

module.exports = {
  validateToken,
  formatWelcomeMessage,
  formatHelpMessage,
  calculate,
  formatUptime,
  parseCommand,
  processMessage,
  initBot
};
