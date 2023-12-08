FROM node:20.8.1-alpine3.18 AS deps
# RUN apk add --no-cache libc6-compat
WORKDIR /
COPY package.json package-lock.json ./
RUN npm config set proxy $HTTP_PROXY
RUN npm config set https-proxy $HTTPS_PROXY
RUN npm set strict-ssl false
RUN npm install

FROM node:20.8.1-alpine3.18 AS builder
WORKDIR /
COPY --from=deps /node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20.8.1-alpine3.18 AS runner
WORKDIR /
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs / ./
COPY --from=builder /node_modules ./node_modules
COPY --from=builder /package.json ./package.json

USER nextjs
CMD ["npm", "start"]