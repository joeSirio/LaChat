FROM node:17-alpine
WORKDIR /frontend
COPY . .

RUN npm i --silent
RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]