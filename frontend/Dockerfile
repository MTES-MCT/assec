#
# NodeJS / Docker - Best Practices
# @see https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
#
# PM2 Docker Integration
# @see http://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs/
#
FROM node:8.11.1-alpine

# maintainer of this docker file
LABEL maintainer=matthieu.lassalvy@beta.gouv.fr

# expose ExpressJS server port to Docker
# FIXME -> should be loaded from .env file
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

WORKDIR /home/node/www
COPY .babelrc .
COPY package.json .
COPY env.config.js .
COPY next.config.js .
COPY app/ ./app/
COPY scss/ ./scss/
COPY pages/ ./pages/
COPY static/ ./static/

RUN yarn install --production
RUN npm run build

# !!! DO NOT RUN AS `ROOT` !!!
USER node
CMD ["npm", "run", "start"]
