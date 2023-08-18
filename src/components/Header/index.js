import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
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
          <Link to="/" className="link-item-small">
            <AiFillHome />
          </Link>
        </li>
        <li className="para">
          <Link to="/jobs" className="link-item">
            Jobs
          </Link>
          <Link to="/jobs" className="link-item-small">
            <BsFillBriefcaseFill />
          </Link>
        </li>
        <li className="para">
          <button
            className="logout-button-small"
            type="button"
            onClick={onClickLogout}
          >
            <FiLogOut />
          </button>
        </li>
      </ul>
      <li className="para para-large">
        <button className="logout-button" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </li>
    </nav>
  )
}

export default withRouter(Header)
