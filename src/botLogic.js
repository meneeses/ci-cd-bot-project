// Retorna uma saudação dependendo do nome
function simpleGreeting(name) {
    if (!name) return "Olá! Como posso ajudar?";
    return `Olá, ${name}! Como posso ajudar?`;
}

// Verifica se a mensagem é um comando válido (começa com /)
function isCommand(text) {
    if (!text) return false;
    return text.startsWith('/');
}

module.exports = {
    simpleGreeting,
    isCommand
};
