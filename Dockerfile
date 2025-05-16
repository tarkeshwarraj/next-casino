# बेस इमेज
FROM node:18-bullseye-slim

# Puppeteer के लिए जरूरी dependencies install करो
RUN apt-get update && apt-get install -y \
    chromium \
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
    libnss3 \
    lsb-release \
    xdg-utils \
    wget \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# काम करने वाली directory सेट करो
WORKDIR /app

# package.json और package-lock.json (या yarn.lock) कॉपी करो
COPY package*.json ./

# npm install करो (या yarn install)
RUN npm install

# बाकी ऐप की फाइलें कॉपी करो
COPY . .

# Puppeteer को chrome executable path बताने के लिए ENV सेट करो (Optional लेकिन बेहतर)
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Next.js production build बनाओ
RUN npm run build

# ऐप स्टार्ट करो (Next.js के लिए)
CMD ["npm", "start"]

# अगर तुम्हारा स्क्रैपिंग वाला node सर्वर अलग है, तो उसे भी इसी container में चलाओ या अलग container बनाओ
