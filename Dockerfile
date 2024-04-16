FROM node:lts-alpine3.19 as build

WORKDIR /dist/src/app

RUN npm cache clean --force

COPY . .

RUN npm install
RUN npm run build

FROM docker.io/nginx:stable-alpine3.17 as ngi

COPY --from=build /dist/src/app/dist/pomovu/browser /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80

