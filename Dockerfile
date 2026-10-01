# Production Dockerfile for GUNI CARS Platform
# Multi-purpose: Full-stack React + Express + Headless Chromium PDF Generator

FROM node:20-slim

# Install Chromium and dependencies for automated PDF generation
RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    fonts-liberation \
    fontconfig \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Set Environment Variables
ENV CHROME_BIN=/usr/bin/chromium \
    NODE_ENV=production \
    PORT=5000

WORKDIR /app

# Cache package installation
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Compile Vite frontend into dist/
RUN npm run build

# Expose server port
EXPOSE 5000

# Start server (serves API and dist/ static assets)
CMD ["npm", "start"]
