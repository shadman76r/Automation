# Use the official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install Node.js dependencies, including Playwright
RUN npm install

# Install Playwright dependencies (browsers and dependencies)
RUN npm init playwright
# Copy the rest of the application files (test scripts , config files, etc.)
COPY . .

# Verify Playwright installation
#RUN npx playwright --version

# Expose port 3000 (optional)
EXPOSE 3000

# Set the entrypoint to run Playwright tests when the container starts
CMD ["npx", "playwright", "test"]
