FROM node:8.11.1-alpine

# maintainer of this docker file
LABEL maintainer=matthieu.lassalvy@beta.gouv.fr

#
# NodeJS Docker Webapp - Official Doc
# @see https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
#
# NodeJS / Docker - Best Practices
# @see https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
#
# PM2 Docker Integration
# @see http://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs/
#

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

WORKDIR /home/node/server
COPY serve.js .
COPY .babelrc .
COPY app/ ./app/
COPY package.json .
COPY entry-point.es6 .

RUN yarn global add pm2
RUN yarn install --production

# !!! DO NOT RUN AS `ROOT` !!!
USER node
CMD ["pm2-runtime", "entry-point.es6"]
