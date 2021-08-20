FROM node:14
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
EXPOSE 8080
RUN yarn 
COPY . .
RUN yarn tsc