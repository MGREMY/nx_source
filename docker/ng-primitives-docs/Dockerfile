FROM node:22-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm && pnpm i --frozen-lockfile
COPY . ./
RUN pnpx nx run ng-primitives-docs:build

FROM nginx:alpine
RUN apk add --no-cache gettext
COPY --from=build app/dist/apps/ng-primitives-docs/browser/ /usr/share/nginx/html
COPY docker/ng-primitives-docs/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

COPY --chmod=755 docker/ng-primitives-docs/entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
