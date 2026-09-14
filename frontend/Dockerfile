# =========================================================
# Stage 1: Build Frontend Assets (Vite Multi-stage)
# =========================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files for Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code and build production assets
COPY . .
RUN npm run build

# =========================================================
# Stage 2: Production Nginx Serving (Ultra Lightweight)
# =========================================================
FROM nginx:1.25-alpine AS production

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static build output from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
