# Build BASE
FROM node:18-alpine as base
LABEL author="duonglongg"

WORKDIR /app
COPY package.json yarn.lock ./
RUN apk update && apk add --no-cache git \
    && yarn --frozen-lockfile \
    && yarn cache clean

# Build Image
FROM node:18-alpine AS build
LABEL author="duonglongg"

WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .

# Cài đặt node-prune
RUN apk update && apk add --no-cache git curl \
    && curl -sfL https://gobinaries.com/tj/node-prune | sh \
    && yarn build \
    && cd .next/standalone \
    && node-prune

# Build production
FROM node:18-alpine AS production
LABEL author="duonglongg"

WORKDIR /app

COPY --from=build /app/public ./public
COPY --from=build /app/next.config.js ./

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
