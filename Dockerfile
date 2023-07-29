FROM node:20-alpine AS builder
USER node
WORKDIR /usr/src/reactapp
COPY --chown=node:node . .
RUN yarn install --immutable --immutable-cache --check-cache  && yarn cache clean

FROM node:20-alpine
USER node
WORKDIR /usr/src/reactapp
COPY . .
COPY --from=builder --chown=node /usr/src/reactapp/node_modules ./node_modules
COPY --from=builder --chown=node /usr/src/reactapp/.env .
COPY --from=builder --chown=node /usr/src/reactapp/package.json .
EXPOSE 3000
CMD ["yarn", "start"]
