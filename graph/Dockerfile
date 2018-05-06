# https://github.com/keymetrics/docker-pm2
FROM node:8.11.1-alpine

LABEL maintainer=matthieu.lassalvy@beta.gouv.fr

WORKDIR /home/node/server
COPY package.json .
COPY build/ ./public/

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

ENV NPM_CONFIG_LOGLEVEL warn
RUN yarn install --production

# !!! DO NOT RUN AS `ROOT` !!!
USER node
CMD ["node", "public"]
