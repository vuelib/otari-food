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

# Mount log dir.
VOLUME /var/log/nginx

COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN mkdir -p /usr/share/nginx/html/.well-known/pki-validation
COPY nginx_config/AF71AE9D2AAA2BA1C601FFB583B3D89C.txt /usr/share/nginx/html/.well-known/pki-validation/AF71AE9D2AAA2BA1C601FFB583B3D89C.txt

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
