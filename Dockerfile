FROM node:alpine3.11
WORKDIR /producteuracheteur
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]
