import { Router } from '@kiwilan/fastify-utils'

const metaRoutes = async () => {
  return {
    home: await Router.route('/'),
    posts: await Router.route('/api/posts'),
  }
}

export {
  metaRoutes,
}
