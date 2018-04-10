FROM nginx

LABEL maintainer=matthieu.lassalvy@beta.gouv.fr

COPY nginx.conf /etc/nginx/nginx.conf

# Install Sources
WORKDIR /var/www
COPY build/ ./public/
