# Usa a imagem oficial do Node.js baseada em Alpine Linux (mais leve)
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências (package.json e package-lock.json se existir)
COPY package*.json ./

# Instala as dependências apenas para produção, sem bibliotecas de desenvolvimento (gerando um build menor)
RUN npm ci --omit=dev

# Copia o restante do código-fonte para o container
COPY . .

# Comando padrão de execução do nosso app
CMD ["npm", "start"]
