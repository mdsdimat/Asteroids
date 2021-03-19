FROM node:14.15
ARG BUILD
ARG VERSION
COPY ./ /var/www/html/
WORKDIR /var/www/html
RUN npm install && npm run api:dbsync && npm run start
