import { Environment, Router } from '@kiwilan/fastify-utils'

const env = Environment.make()

const metaRoutes = () => {
  return {
    home: Router.route('/'),
    posts: Router.route('/api/posts'),
  }
}

export {
  metaRoutes,
}
