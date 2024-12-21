# Use uma imagem base do Node.js
FROM node:18

# Defina o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos para o contêiner
COPY . .

# Exponha a porta usada pelo app
EXPOSE 4001

# Comando para iniciar o app
CMD ["npm", "start"]
