# बेस इमेज
FROM node:18-slim

# Puppeteer के लिए जरूरी dependencies install करो
RUN apt-get update && apt-get install -y \
  ca-certificates \
  fonts-liberation \
  libappindicator1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libc6 \
  libcairo2 \
  libcups2 \
  libdbus-1-3 \
  libexpat1 \
  libfontconfig1 \
  libgcc1 \
  libgconf-2-4 \
  libgdk-pixbuf2.0-0 \
  libglib2.0-0 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libpango-1.0-0 \
  libx11-6 \
  libx11-xcb1 \
  libxcb1 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxext6 \
  libxfixes3 \
  libxi6 \
  libxrandr2 \
  libxrender1 \
  libxss1 \
  libxtst6 \
  wget \
  xdg-utils \
  --no-install-recommends && \
  apt-get clean && rm -rf /var/lib/apt/lists/*

# ऐप directory सेट करो
WORKDIR /app

# package.json और package-lock.json कॉपी करो
COPY package*.json ./

# npm install करो
RUN npm install

# Puppeteer के लिए Chrome browser install करो (Optional लेकिन recommended)
RUN npx puppeteer browsers install chrome

# बाकी सारे source files कॉपी करो
COPY . .

# Next.js प्रोडक्शन build बनाओ
RUN npm run build

# Puppeteer executable path environment variable सेट करो
ENV PUPPETEER_EXECUTABLE_PATH=$(node -e "console.log(require('puppeteer').executablePath())")

# ऐप स्टार्ट करो
CMD ["npm", "start"]
