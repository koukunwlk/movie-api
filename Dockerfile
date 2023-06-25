FROM node:20-alpine3.17

ENV DATABASE_URL="mongodb+srv://mrrobot:Jz92NVsww9C1fSiF@movie-api.r4m9eta.mongodb.net/?retryWrites=true&w=majority"
ENV DATABASE_NAME="movie-api"
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn install --frozen-lockfile

COPY . /app

EXPOSE 3000

CMD ["yarn", "start"]