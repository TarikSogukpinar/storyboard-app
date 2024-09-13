# Step 1: Use the official Node.js image as the base image
FROM node:20-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the container
COPY . .

# Step 6: Build the SvelteKit application
RUN npm run build

# Step 7: Expose the port that the SvelteKit app will run on
EXPOSE 4173

# Step 8: Command to run the application
CMD ["npm", "run", "preview", "--", "--host"]