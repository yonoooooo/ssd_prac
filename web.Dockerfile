# Uses the official Node.js image version 18
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
RUN npm install

# Copy all the files from the app directory to the working directory
COPY src .       

# Expose port 3000 for the web server
EXPOSE 3000

# Start the Node.js application
CMD ["node", "server.js"]
