FROM node:18.16.1-alpine3.18

WORKDIR /app

COPY package.json .
RUN npm i

COPY . .

EXPOSE 3000
RUN npm run dev