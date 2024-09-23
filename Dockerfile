# Use uma imagem base do Node.js
FROM node:18

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto para o contêiner
COPY . .

# Expondo a porta configurada
EXPOSE 3000 

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]


