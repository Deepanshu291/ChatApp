FROM node:18-alpine

WORKDIR /app

# COPY package*.json ./
COPY package.json yarn.lock /app/

RUN yarn install 

COPY . .

RUN yarn build

COPY . .

EXPOSE 5500 

CMD ["yarn", "start"]