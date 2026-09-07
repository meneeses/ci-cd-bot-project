const {
  validateToken,
  formatWelcomeMessage,
  formatHelpMessage,
  calculate,
  formatUptime,
  parseCommand,
  processMessage
} = require('../src/bot');

describe('Suíte de Testes Unitários do Bot CI/CD', () => {

  // Teste 1: Validação de Boas-Vindas com nome personalizado
  test('1. formatWelcomeMessage: deve formatar mensagem de boas-vindas com o nome do usuário', () => {
    const message = formatWelcomeMessage('Carlos');
    expect(message).toBe('Olá, Carlos! Bem-vindo ao bot de CI/CD da PUCPR.');
  });

  // Teste 2: Validação de Boas-Vindas com nome ausente/padrão
  test('2. formatWelcomeMessage: deve usar "usuário" como padrão quando o nome não for informado', () => {
    const messageNull = formatWelcomeMessage(null);
    const messageEmpty = formatWelcomeMessage('');
    expect(messageNull).toBe('Olá, usuário! Bem-vindo ao bot de CI/CD da PUCPR.');
    expect(messageEmpty).toBe('Olá, usuário! Bem-vindo ao bot de CI/CD da PUCPR.');
  });

  // Teste 3: Validação de Token Telegram (inválido / placeholder)
  test('3. validateToken: deve rejeitar tokens inválidos, vazios ou o placeholder de exemplo', () => {
    expect(validateToken('')).toBe(false);
    expect(validateToken(null)).toBe(false);
    expect(validateToken('YOUR_TELEGRAM_BOT_TOKEN_HERE')).toBe(false);
    expect(validateToken('12345:abc')).toBe(false);
  });

  // Teste 4: Validação de Token Telegram (formato válido)
  test('4. validateToken: deve aceitar token no formato padrão do Telegram', () => {
    // Padrão Telegram: 8 a 10 dígitos, seguido de ":" e 35 caracteres alfanuméricos/hífens
    const validToken = '123456789:ABCdefGHIjklMNOpqrsTUVwxyz123456789';
    expect(validateToken(validToken)).toBe(true);
  });

  // Teste 5: Parsing de comandos e argumentos
  test('5. parseCommand: deve separar corretamente o comando e seus argumentos', () => {
    const result = parseCommand('/calc 10 + 20');
    expect(result.command).toBe('/calc');
    expect(result.args).toEqual(['10', '+', '20']);
  });

  // Teste 6: Parsing de texto vazio ou inválido
  test('6. parseCommand: deve lidar corretamente com entradas vazias ou nulas', () => {
    expect(parseCommand('')).toEqual({ command: '', args: [] });
    expect(parseCommand(null)).toEqual({ command: '', args: [] });
  });

  // Teste 7: Operações aritméticas básicas
  test('7. calculate: deve realizar operações aritméticas básicas (+, -, *, /)', () => {
    expect(calculate(10, '+', 5)).toBe(15);
    expect(calculate(10, '-', 4)).toBe(6);
    expect(calculate(6, '*', 7)).toBe(42);
    expect(calculate(20, '/', 4)).toBe(5);
  });

  // Teste 8: Tratamento de divisão por zero
  test('8. calculate: deve retornar mensagem de erro amigável ao tentar dividir por zero', () => {
    const result = calculate(10, '/', 0);
    expect(result).toBe('Erro: Divisão por zero não é permitida');
  });

  // Teste 9: Tratamento de operador inválido e entradas não numéricas
  test('9. calculate: deve retornar erro para operador inválido ou entradas que não são números', () => {
    expect(calculate(10, '^', 2)).toBe("Erro: Operador '^' não suportado");
    expect(calculate('abc', '+', 5)).toBe('Erro: Números inválidos');
  });

  // Teste 10: Formatação de tempo de execução (uptime)
  test('10. formatUptime: deve formatar segundos em representação legível (horas, minutos e segundos)', () => {
    expect(formatUptime(45)).toBe('45s');
    expect(formatUptime(125)).toBe('2m 5s');
    expect(formatUptime(3665)).toBe('1h 1m 5s');
    expect(formatUptime(-10)).toBe('0s');
  });

  // Teste 11: Processamento de mensagem - Comando /help
  test('11. processMessage: deve retornar texto de ajuda para o comando /help', () => {
    const reply = processMessage('/help');
    expect(reply).toContain('📌 Comandos disponíveis:');
    expect(reply).toContain('/start');
    expect(reply).toContain('/calc');
  });

  // Teste 12: Processamento de mensagem - Comando /echo
  test('12. processMessage: deve responder com o texto replicado no comando /echo', () => {
    const reply = processMessage('/echo Teste de Integração Contínua');
    expect(reply).toBe('Teste de Integração Contínua');
  });

  // Teste 13: Processamento de mensagem - Comando desconhecido
  test('13. processMessage: deve responder com mensagem de comando não reconhecido para comandos inválidos', () => {
    const reply = processMessage('/comando_inexistente');
    expect(reply).toBe('Comando não reconhecido. Digite /help para ver os comandos disponíveis.');
  });

});

