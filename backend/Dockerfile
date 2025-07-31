FROM node:22

# Install OS dependency untuk Prisma dan native modules
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    openssl \
    bash \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh kode
COPY . .

# Build TypeScript ke JavaScript
RUN npm run build

# Generate Prisma Client (berdasarkan hasil build)
RUN npx prisma generate

# Optional: apply migration otomatis jika kamu butuh
# RUN npx prisma migrate deploy

# Jalankan di port 5000
EXPOSE 5000

# Jalankan hasil build
CMD ["npm", "run", "start"]
