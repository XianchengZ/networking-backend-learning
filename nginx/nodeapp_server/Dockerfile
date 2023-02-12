FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

ARG DEFAULT_PORT=9999

EXPOSE $DEFAULT_PORT

CMD [ "node", "index.js" ]