# Base image
FROM mcr.microsoft.com/playwright/node:18-slim

# Working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Playwright dependencies & browsers
RUN npx playwright install --with-deps

# Copy rest of the project
COPY . .

# Build Next.js project
RUN npm run build

# Expose port (Next.js uses 3000 by default)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
