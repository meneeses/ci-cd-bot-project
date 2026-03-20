const { simpleGreeting, isCommand } = require('../src/botLogic');

describe('Testes da Lógica do Bot 🤖', () => {
    test('Deve retornar saudação genérica quando não há nome', () => {
        expect(simpleGreeting(null)).toBe("Olá! Como posso ajudar?");
        expect(simpleGreeting("")).toBe("Olá! Como posso ajudar?");
    });

    test('Deve retornar saudação personalizada quando há o nome do usuário', () => {
        expect(simpleGreeting("Professor")).toBe("Olá, Professor! Como posso ajudar?");
    });

    test('Deve identificar corretamente um comando de texto (começando com a barra /)', () => {
        expect(isCommand("/start")).toBe(true);
        expect(isCommand("/help")).toBe(true);
        expect(isCommand("apenas uma mensagem normal")).toBe(false);
        expect(isCommand(null)).toBe(false);
    });
});
