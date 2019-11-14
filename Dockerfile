FROM node:latest    

WORKDIR /usr/src/app
COPY package.json .
RUN npm install    
COPY . .
RUN npm run build
#RUN npm run seedDocker

EXPOSE 3003

CMD [ "npm", "start" ] 
