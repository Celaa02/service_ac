# Imagen base
FROM mirror.gcr.io/library/node:20-alpine
FROM node:20-alpine
WORKDIR /app

ENV NPM_CONFIG_LEGACY_PEER_DEPS=true \
    NPM_CONFIG_AUDIT=false \
    NPM_CONFIG_FUND=false

COPY package*.json ./
RUN npm ci

COPY . .
EXPOSE 4200
CMD ["npm", "run", "start"]  # ng serve --host 0.0.0.0 --port 4200

