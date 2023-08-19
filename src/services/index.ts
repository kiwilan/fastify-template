import { Router } from '@kiwilan/fastify-utils'

function metaRoutes() {
  return {
    home: Router.route('/'),
    posts: Router.route('/api/posts'),
  }
}

export {
  metaRoutes,
}
