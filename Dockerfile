# Build
FROM node:18 as build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Produção
FROM node:18 as production

WORKDIR /usr/src/app

# Copiar arquivos do build
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./

# Copiar script de espera
COPY wait-for-db.sh ./
RUN chmod +x /usr/src/app/wait-for-db.sh

# Instalar cliente PostgreSQL
RUN apt-get update && apt-get install -y postgresql-client

RUN npm install --only=production

EXPOSE 3000

CMD ["./wait-for-db.sh", "node", "dist/main.js"]
