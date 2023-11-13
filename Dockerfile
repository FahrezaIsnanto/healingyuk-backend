FROM --platform=linux/amd64 node:16.15.0-alpine3.15

WORKDIR /app
ENV PORT 5000

COPY package*.json /app

RUN npm install

COPY . /app

EXPOSE 5000
CMD ["node", "app.js"]