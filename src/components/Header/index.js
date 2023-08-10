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
    <div className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="web-image"
        />
      </Link>
      <div className="home-job-container">
        <Link to="/" className="link-item">
          <li className="para">Home</li>
        </Link>
        <Link to="/jobs" className="link-item">
          <li className="para">Jobs</li>
        </Link>
      </div>
      <button className="logout-button" type="button" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
