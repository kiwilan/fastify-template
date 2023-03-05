import { Router } from '@kiwilan/fastify-utils'

const metaRoutes = () => {
  return {
    home: Router.route('/'),
    posts: Router.route('/api/posts'),
  }
}

export {
  metaRoutes,
}
