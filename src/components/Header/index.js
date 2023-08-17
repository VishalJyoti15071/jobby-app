import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="web-image"
        />
      </Link>
      <ul className="home-job-container">
        <li className="para">
          <Link to="/" className="link-item">
            Home
          </Link>
        </li>
        <li className="para">
          <Link to="/jobs" className="link-item">
            Jobs
          </Link>
        </li>
      </ul>
      <li className="para">
        <button className="logout-button" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </li>
    </nav>
  )
}

export default withRouter(Header)
