FROM node:16 as build 
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

FROM nginx:1.23
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
