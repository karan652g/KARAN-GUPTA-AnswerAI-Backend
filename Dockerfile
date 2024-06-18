# Dockerfile

# Use Node.js version 14 LTS
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /usr/src/index

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port on which the app runs
EXPOSE 3000

# Command to run the application
CMD ["node", "src/index.js"]
