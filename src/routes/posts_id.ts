import type { FastifyPluginAsync } from 'fastify'
import { Router } from 'fastify-utils'

const route: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: Router.setRoute('/posts/:id'),
    async handler() {
      return {
        // ...
      }
    },
  })
}

export default route
