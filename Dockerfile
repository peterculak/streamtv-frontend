FROM node:11-slim
RUN apt-get update
RUN apt-get -y install git
WORKDIR /opt/streamtv-frontend
COPY package.json /opt/streamtv-frontend
COPY package-lock.json /opt/streamtv-frontend
RUN cd /opt/streamtv-frontend && npm install
COPY . .
EXPOSE 3000
ENTRYPOINT npm start