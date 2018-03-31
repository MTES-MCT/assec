FROM node:alpine
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

# Install bash commands
RUN apk update && apk add bash

# Creating aliases
WORKDIR /home/node
RUN touch .bashrc
RUN echo 'alias ll="ls -lA"' > .bashrc
# RUN source /home/node/.bashrc

WORKDIR /home/node/app
COPY package.json .
COPY server.js .
COPY pm2.json .
COPY build/ ./public/

RUN npm install --only=production
RUN npm install pm2 -g

EXPOSE 3000

# !!! DO NOT RUN AS `ROOT` !!!
# USER node
CMD ["pm2-runtime", "pm2.json"]
