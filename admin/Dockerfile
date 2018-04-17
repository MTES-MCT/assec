#
# NodeJS / Docker - Best Practices
# @see https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
#
# PM2 Docker Integration
# @see http://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs/
#
FROM node:8.11.1-alpine

# File Author / Maintainer
LABEL maintainer=matthieu.lassalvy@beta.gouv.fr

# NPM Env Configuration
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

# Install Sources
WORKDIR /home/node/www
COPY serve.js .
COPY package.json .
COPY build/ ./public/
COPY server/ ./server/

# NPM Install
RUN yarn global add pm2
RUN yarn install --production

# !!! DO NOT RUN AS `ROOT` !!!
USER node
CMD ["pm2-runtime", "serve.js"]
