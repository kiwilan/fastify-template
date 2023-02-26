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
