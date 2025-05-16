# बेस इमेज
FROM node:18-bullseye-slim

# Puppeteer को Chromium डाउनलोड करने की अनुमति दो
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=false

# Puppeteer के लिए जरूरी dependencies इंस्टॉल करो
RUN apt-get update && apt-get install -y \
    gconf-service \
    libasound2 \
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
    ca-certificates \
    fonts-liberation \
    libappindicator1 \
    lsb-release \
    xdg-utils \
    wget \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*

# काम करने वाली directory सेट करो
WORKDIR /app

# package.json और package-lock.json कॉपी करो
COPY package*.json ./

# Puppeteer को Chromium डाउनलोड करने के लिए इंस्टॉल करो
RUN npm install puppeteer@latest

# बाकी dependencies इंस्टॉल करो
RUN npm install

# बाकी ऐप की फाइलें कॉपी करो
COPY . .

# ❌ No need to set PUPPETEER_EXECUTABLE_PATH
# Puppeteer खुद bundled Chromium use करेगा

# Next.js production build बनाओ
RUN npm run build

# ऐप स्टार्ट करो
CMD ["npm", "start"]
