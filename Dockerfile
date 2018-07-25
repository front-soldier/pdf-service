FROM node:carbon
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN apt-get update
RUN apt-get install software-properties-common python-software-properties -y
RUN apt-get install default-jre default-jre-headless -y
RUN add-apt-repository ppa:libreoffice/libreoffice-5-4
RUN apt-get update || echo "Error with update"
RUN apt-get install libreoffice -y
CMD ["npm","start"]
