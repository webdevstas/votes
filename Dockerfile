FROM node:15.10-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ./package.json ./package.json
COPY . .
RUN npm install -g pm2
RUN npm install --production --silent
EXPOSE 1001
EXPOSE 3000
CMD ["npm", "start"]
