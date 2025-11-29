# Build Stage 1
FROM node:24.11.1-slim AS build
WORKDIR /app

# Copy package.json 
COPY package.json ./

# Install dependencies
RUN npm i

# Copy the entire project
COPY . ./

# Build the project
RUN npm run build

# Build Stage 2
FROM node:24.11.1-slim
WORKDIR /app

# Only `.output` folder is needed from the build stage
COPY --from=build /app/.output/ ./

# Change the port and host
ENV PORT=80
ENV HOST=0.0.0.0
ENV DATABASE_URL=file:/app/.data/dev.db

EXPOSE 80

CMD ["node", "/app/server/index.mjs"]