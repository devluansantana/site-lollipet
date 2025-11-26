# 1. Escolhe a imagem base (Node.js versão 18)
FROM node:22-alpine

# 2. Define o diretório de trabalho dentro do container
WORKDIR /app

# 3. Copia os arquivos de dependências primeiro (para aproveitar o cache do Docker)
COPY package.json package-lock.json ./

# 4. Instala as dependências
RUN npm install

# 5. Copia o restante do código do projeto para dentro do container
COPY . .

# 6. Expõe a porta que o Vite usa (geralmente 5173 ou 3000)
EXPOSE 5173

# 7. Comando para iniciar a aplicação
CMD ["npm", "run", "dev", "--", "--host"]