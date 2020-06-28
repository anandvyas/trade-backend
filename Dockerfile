FROM node:lts-alpine3.9
WORKDIR /usr/src/app
CMD [ "node", "master.js" ]