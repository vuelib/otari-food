# FROM mhart/alpine-node:10.8.0 as build-stage
FROM node:lts-alpine as build-stage

# ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

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

# Set the timezone.
ENV TZ=Europe/Moscow

# Create and mount cert dir.
RUN mkdir -p /etc/nginx/ssl
VOLUME       /etc/nginx/ssl

COPY nginx_config/nginx.conf /etc/nginx/nginx.conf
COPY nginx_config/default-${NODE_ENV}.conf /etc/nginx/conf.d/default.conf

COPY nginx_config/docker-entrypoint.sh /usr/local/bin/
COPY nginx_config/le.sh /usr/local/bin/
COPY nginx_config/le-gen.sh /usr/local/bin/
COPY nginx_config/start-nginx.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh \
&& chmod +x /usr/local/bin/le.sh \
&& chmod +x /usr/local/bin/le-gen.sh \
&& chmod +x /usr/local/bin/start-nginx.sh

# Mount log dir.
VOLUME /var/log/nginx

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80
EXPOSE 443

ENTRYPOINT ["docker-entrypoint.sh"]
# CMD ["nginx", "-g", "daemon off;"]
