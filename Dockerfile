FROM node:20

WORKDIR /usr/src/app

COPY package.json ./

RUN npm i

COPY . .

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV BACKEND_URL=http://192.168.0.6:3001/api/v1/
CMD [ "node", "server" ]
