FROM node:16
  
WORKDIR /todo-app/todo-backend

COPY --chown=node:node . .
RUN npm ci 

ENV DEBUG=todo-express-backend:*

USER node
CMD npm start