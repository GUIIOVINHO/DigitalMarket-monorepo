FROM node:20

WORKDIR /app

RUN npm install -g pnpm

COPY . .

RUN pnpm install

EXPOSE 3000
EXPOSE 3001
EXPOSE 3002
EXPOSE 3003
EXPOSE 3004

CMD ["pnpm", "dev"]