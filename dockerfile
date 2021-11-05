FROM node:12.18.3

WORKDIR /ui

COPY package*.json ./

RUN npm install

WORKDIR /ui

COPY . /ui/

ENV PORT=7777

EXPOSE 7777

CMD [ "npm", "run", "dev" ]
