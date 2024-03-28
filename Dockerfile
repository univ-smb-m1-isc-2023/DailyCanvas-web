# Use official Node.js image as the base image
FROM node:latest as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Use a lightweight Node.js image for production
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build /app/dist/daily-canvas-web /app

# Install serve to run the production server
RUN npm install -g @angular/cli

# Expose port 3000 to the outside world
EXPOSE 4200

# Command to run the production server
CMD ["ng", "serve"]
