# FROM mhart/alpine-node:10.8.0 as build-stage
FROM node:lts-alpine as build-stage

# ENV NODE_ENV=production
ARG NODE

RUN mkdir -p /app
COPY . /app
WORKDIR /app


RUN npm install

ENV NODE_ENV ${NODE}
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
    npm run build_stage; \
    fi

# production-stage
FROM nginx:stable-alpine as production-stage

# Install dependencies.
RUN apk update && apk add certbot tzdata openssl

# Set the timezone.
ENV TZ=Europe/Moscow

# Create and mount cert dir.
RUN mkdir -p /etc/nginx/ssl
VOLUME       /etc/nginx/ssl

COPY nginx_config/nginx.conf /etc/nginx/nginx.conf
COPY nginx_config/default.conf /etc/nginx/conf.d/default.conf
COPY nginx_config/docker-entrypoint.sh /usr/local/bin/
COPY nginx_config/le.sh /usr/local/bin/
COPY nginx_config/start-nuxt.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh \
&& chmod +x /usr/local/bin/le.sh && chmod +x /usr/local/bin/start-nuxt.sh

# Mount log dir.
VOLUME /var/log/nginx

COPY --from=build-stage /app/ /usr/share/nginx/html
RUN mkdir -p /usr/share/nginx/html/.well-known/acme-challenge
EXPOSE 80
EXPOSE 443

RUN apk add npm
RUN apk add nodejs

ENTRYPOINT ["docker-entrypoint.sh"]


