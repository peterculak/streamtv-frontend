FROM node:11-slim
RUN apt-get update
RUN apt-get -y install git
EXPOSE 3000
CMD ['node']
