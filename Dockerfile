FROM node:18

# Make app directory
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# Copy + install app dependencies
COPY package*.json ./
RUN npm install

# Bundle source
COPY . .

# Expose ports the server runs on
EXPOSE 80
EXPOSE 443

# Start the bot
CMD [ "npm", "start" ]