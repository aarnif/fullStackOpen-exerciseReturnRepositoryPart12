FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV REACT_APP_BASE_URL="http://localhost:8080"

CMD ["npm", "start"]