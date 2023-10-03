FROM node:16-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm install -g nodemon
RUN npm rebuild bcrypt --build-from-source

EXPOSE 3001

CMD ["nodemon", "app.js"]
