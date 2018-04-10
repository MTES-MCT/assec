FROM node:8.11.0-alpine

# File Author / Maintainer
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
# PS1 Prompt Generated with
# http://bashrcgenerator.com
#

# NPM Env Configuration
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

# Install Sources
WORKDIR /home/node/app
COPY server.js .
COPY package.json .
COPY build/ ./public/

# NPM Install
RUN yarn global add pm2
RUN yarn install --production

# expose ExpressJS server port to Docker Compose links
EXPOSE 3100

# !!! DO NOT RUN AS `ROOT` !!!
USER node
CMD ["pm2-runtime", "server.js"]
