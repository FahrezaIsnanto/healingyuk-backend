FROM --platform=linux/amd64 node:16.15.0-alpine3.15

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

CMD ["node", "app.js"]