#1 Stage
FROM node:latest AS base
WORKDIR /app

COPY package.json bun.lockb ./

RUN npm install -g bun --omit=optional

RUN bun i

COPY . .

RUN bun run build

#2 Stage
FROM nginx:alpine AS production-stage
COPY --from=base /app/dist/workflow-app/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Health Check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]