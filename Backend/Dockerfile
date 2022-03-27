FROM node:14

WORKDIR /app

COPY ./package.json .

RUN  npm install

COPY . .

RUN mv .env-docker .env

EXPOSE 3000

RUN npx prisma generate

CMD ["npm", "start"]