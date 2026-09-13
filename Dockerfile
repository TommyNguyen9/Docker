FROM node:26.8-slim

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password

RUN mkdir -p /docker/my-app

COPY . /docker/my-app

CMD ["node", "/docker/my-app/app/server.js"]