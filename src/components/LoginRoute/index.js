import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginRoute extends Component {
  state = {username: '', password: '', isShowError: false, error: ''}

  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 90})
    const {history} = this.props
    history.replace('/')
  }

  onFailureLogin = errorMsg => {
    this.setState({isShowError: true, error: errorMsg})
  }

  onClickSubmit = async event => {
    event.preventDefault()
    const loginUrl = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessLogin(data.jwt_token)
    }
    this.onFailureLogin(data.error_msg)
  }

  onChangeName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, isShowError, error} = this.state
    return (
      <div className="login-main-container">
        <div className="login-main-card-container">
          <form className="login-container" onSubmit={this.onClickSubmit}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="jobby-logo"
            />
            <label htmlFor="userName" className="label-heading">
              USERNAME
            </label>
            <input
              type="text"
              value={username}
              className="user-input"
              placeholder="Username"
              id="userName"
              onChange={this.onChangeName}
            />
            <label htmlFor="userPass" className="label-heading">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              className="user-input"
              placeholder="Password"
              id="userPass"
              onChange={this.onChangePassword}
            />
            <button className="button" type="submit">
              Login
            </button>
            {isShowError && <p className="error-para">*{error}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginRoute
