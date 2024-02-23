FROM node:16-alpine

WORKDIR /front-app

COPY package*.json ./

RUN npm install

# Mentioned exposed port for documentation
EXPOSE 4200

CMD ["npm", "start"]
