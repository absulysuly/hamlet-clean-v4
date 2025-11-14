# Dockerfile

# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install --production=false

# Bundle app source
COPY . .

# Expose port
EXPOSE 8080

# Define the command to run the app
CMD [ "node", "server.js" ]