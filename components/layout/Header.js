import routes from '../../server/routes'

const { Link } = routes

export default () => (<header>
  <nav>
    <Link route="index">
      <a>index</a>
    </Link>
    |
    <Link route="about">
      <a>about</a>
    </Link>
  </nav>
</header>)