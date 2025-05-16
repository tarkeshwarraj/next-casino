# ✅ Use official Playwright base image with Node.js 18+
FROM mcr.microsoft.com/playwright:v1.52.0-jammy

# Set working directory
WORKDIR /app

# Copy package files first for caching dependencies
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# (Optional) Install Chromium-based tools (already handled by base image)
RUN npx playwright install --with-deps

# Copy remaining source code
COPY . .

# Build the Next.js project
RUN npm run build

# Expose the port Next.js runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
