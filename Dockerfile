FROM node:20-alpine3.17

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn install --frozen-lockfile

COPY . /app

EXPOSE 3000

CMD ["yarn", "start"]