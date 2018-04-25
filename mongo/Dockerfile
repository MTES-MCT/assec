FROM mongo:3.6.3-jessie

# maintainer of this docker file
LABEL maintainer=matthieu.lassalvy@beta.gouv.fr

WORKDIR /mongodb
COPY ./mongod.conf .

USER deploy
CMD ["mongod", "-f", "/mongodb/mongod.conf", "--noauth"]
