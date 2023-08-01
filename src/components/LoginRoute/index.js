import {Component} from 'react'
import './index.css'

class LoginRoute extends Component {
  state = {username: '', password: ''}

  onClickSubmit = event => {
    event.preventDefault()
  }

  render() {
    const {username, password} = this.state
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
            />
            <button className="button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginRoute
