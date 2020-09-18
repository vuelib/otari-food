# FROM mhart/alpine-node:10.8.0 as build-stage
FROM node:lts-alpine as build-stage

# ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install

ARG NODE_ENV

RUN if [ "$NODE_ENV" == "production" ]; \
    then \
    mv public/robots.txt.prod public/robots.txt; \
    else \
    mv public/robots.txt.stage public/robots.txt; \
    fi

RUN if [ "$NODE_ENV" == "production" ]; \
    then \
    npm run build; \
    else \
    npm run build_staging; \
    fi

# production-stage
FROM nginx:stable-alpine as production-stage
ARG NODE_ENV

# Install dependencies.
RUN apk update && apk add certbot tzdata openssl

# Set the timezone.
ENV TZ=Europe/Moscow

# Create and mount cert dir.
RUN mkdir -p /etc/nginx/ssl
VOLUME       /etc/nginx/ssl

COPY nginx_config/nginx.conf /etc/nginx/nginx.conf
COPY nginx_config/default-${NODE_ENV}.conf /etc/nginx/conf.d/default.conf
COPY nginx_config/docker-entrypoint.sh /usr/local/bin/
COPY nginx_config/le.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh \
&& chmod +x /usr/local/bin/le.sh

# Mount log dir.
VOLUME /var/log/nginx

COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN mkdir -p /usr/share/nginx/html/.well-known/acme-challenge
EXPOSE 80
EXPOSE 443

ENTRYPOINT ["docker-entrypoint.sh"]


