# Stage 1: Build the application
FROM node:18.17.1-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the application source code to the container
COPY . .

# Build TypeScript source code
RUN npm run build

# Stage 2: Create a smaller production image
FROM node:18.17.1-alpine AS production

# Expose the port Express.js app is listening on
ENV PORT=3000
EXPOSE $PORT

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy only the built files and production dependencies from the previous stage
COPY --from=build /app/dist ./dist

# Command to start application
CMD [ "node", "dist/index.js" ]
