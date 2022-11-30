# build environment
FROM node:14-alpine as react-build
WORKDIR /app
COPY . ./
RUN npm install

ENV VITE_API_BASE_URL="https://api.petalog.xyz"
ENV VITE_KAKAO_KEY="6d0cbe39d9e87963ffe1f458f28e9cb8"

CMD echo ${VITE_API_BASE_URL}

RUN npm run build

# server environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template

COPY --from=react-build /app/build /usr/share/nginx/html

ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"