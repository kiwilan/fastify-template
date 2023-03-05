import { LocalServer } from '@kiwilan/fastify-utils'

LocalServer.run({
  register: async (fastify) => {
    console.log(dotenv)
  }
})
