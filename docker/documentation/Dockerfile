FROM node:22-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN npm i -g pnpm && pnpm i --frozen-lockfile --ignore-scripts
COPY . ./
RUN pnpm exec nx build documentation

FROM nginx:alpine
RUN apk add --no-cache gettext
COPY --from=build app/dist/apps/documentation/browser/ /usr/share/nginx/html
COPY docker/documentation/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

COPY --chmod=755 docker/documentation/entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
