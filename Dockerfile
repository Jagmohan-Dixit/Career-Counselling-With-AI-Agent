# Use the official Node.js image as the base
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies for building native modules
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install root dependencies
RUN npm install

# Install server dependencies
# RUN cd server && npm install

# Copy the rest of the application
COPY . .

# Expose the port Next.js runs on
EXPOSE 3000 4000 27017

# Default command to run the dev script
CMD ["npm", "run", "dev"]


