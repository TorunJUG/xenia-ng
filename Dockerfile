FROM dockerfile/nodejs

MAINTAINER Jakub Marchwicki <kuba.marchwicki@gmail.com>

## this part is preparing Angular frontend

RUN mkdir /xenia-ng
ADD app /xenia-ng/app
COPY bower.json /xenia-ng/
COPY package.json /xenia-ng/

EXPOSE 8000

WORKDIR /xenia-ng
RUN npm install

CMD ["npm", "start"]
