# Install dependencies only when needed
FROM node:20-alpine AS deps
WORKDIR /app

# Install OS deps for sharp if needed
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js app
RUN npm run build

# Production image, copy file system from builder


FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production


# Don’t run Next.js as root
USER node

#COPY --from=builder /app/public ./public # no public folder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=deps /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
