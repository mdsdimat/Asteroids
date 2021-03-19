FROM node:14.15.4-alpine
ARG BUILD
ARG VERSION
COPY ./ /var/www/html/
WORKDIR /var/www/html
RUN npm install
