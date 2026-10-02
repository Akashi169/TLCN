# =========================================================
# Stage 1: Build Dependencies Layer (Docker Cache Optimized)
# =========================================================
FROM node:20-alpine AS dependencies

WORKDIR /app

# Copy package descriptors first to maximize layer caching
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production --ignore-scripts && npm cache clean --force

# =========================================================
# Stage 2: Final Production Runner (Minimalist & Secure)
# =========================================================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

# Copy installed production dependencies from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/package.json ./package.json

# Copy application source code
COPY . .

# Set permissions for non-root node user
USER node

EXPOSE 3001

# Health check inside container
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/health || exit 1

CMD ["node", "index.js"]
