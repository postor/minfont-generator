import nextRoutes from 'next-routes'

const routes = nextRoutes()

routes
  .add('index', '/')
  .add('about')
  .add('user')

export default routes