FROM node:14
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "./"]
EXPOSE 8080
RUN yarn 
COPY . .
RUN yarn tsc
CMD ["yarn", "docker"]