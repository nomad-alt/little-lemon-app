import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/booking">Reservations</Link>
      <Link to="/">Order Online</Link>
      <Link to="/">Login</Link>
    </nav>
  )
}

export default Nav