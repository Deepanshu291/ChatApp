FROM node:18-alpine

WORKDIR /app 

COPY package.json yarn.lock /app/

RUN yarn install 

COPY . .

EXPOSE 5175

CMD ["yarn", "dev"]