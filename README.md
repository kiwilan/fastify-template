# Fastify template

A template for [fastify](https://www.fastify.io/) with Typescript, eslint, pnpm and `@kiwilan/fastify-utils`.

## Setup

```bash
pnpm i
```

```bash
cp .env.example .env
```

```bash
pnpm dev
```

## Build

In `.env`:

```bash
NODE_ENV=production # development | test | production
LOG_LEVEL=error      # debug | error | fatal  | info | trace | warn | silent

PORT=3000 # pm2 port
BASE_URL=domain.com
HTTPS=true
```

```bash
pnpm build
```

### Nginx

```bash
server {
  listen 80;
  listen [::]:80;
  server_name api.domain.com;

  charset utf-8;

  error_log /var/log/nginx/api.log warn;
  access_log /var/log/nginx/api.log;

  location / {
    include proxy_params;
    proxy_pass http://localhost:3000; # pm2 port
  }
}
```
