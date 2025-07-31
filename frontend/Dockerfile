FROM node:22

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua project
COPY . .

# Build Vite project
RUN npm run build

# Install serve untuk serving static files
RUN npm install -g serve

# Expose port sesuai serve (biasanya 3000)
EXPOSE 3000

# Jalankan static file dari dist/
CMD ["serve", "-s", "dist", "-l", "3000"]
