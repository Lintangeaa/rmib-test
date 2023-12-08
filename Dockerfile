# Stage 1: Build Dependencies
FROM node:20.10.0 AS deps

WORKDIR /
COPY package.json package-lock.json ./
RUN  npm install

# Stage 2: Build Application
FROM node:20.10.0 AS builder

WORKDIR /
COPY --from=deps /node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production Image
FROM node:20.10.0 AS runner

WORKDIR /

# Copy from the builder stage
COPY --from=builder --chown=nextjs:nodejs / .


CMD ["npm", "start"]
