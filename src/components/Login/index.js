import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMssg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMssg: errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  userNameInput = event => {
    this.setState({username: event.target.value})
  }

  passwordInput = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showSubmitError, errorMssg} = this.state

    // const jwtToken = Cookies.get('jwt_token')
    // if (jwtToken !== undefined) {
    //   return <Redirect to="/" />
    // }

    return (
      <div className="main-container">
        <div className="main-container-1">
          <div className="banner-img">
            <img
              alt="login imag"
              src="https://res.cloudinary.com/dj2ghn49v/image/upload/v1668843202/OBJECTS_uoygcd.png"
            />
          </div>
          {/* 
          login Container 
          */}
          <div className="login-container">
            <div className="logo-container-text">
              <img
                className="logo"
                alt="login 2"
                src="https://res.cloudinary.com/dj2ghn49v/image/upload/v1668843404/Group_1_oosqzu.png"
              />
              <h2 className="main-heading">Insta Share</h2>
            </div>
            <form onSubmit={this.submitForm}>
              <label className="labelEl" htmlFor="userName">
                USERNAME
              </label>
              <br />
              <input
                value={username}
                onChange={this.userNameInput}
                placeholder="USERNAME"
                className="inputEle"
                id="userName"
                type="text"
              />
              <br />
              <br />
              <label className="password-label labelEl" htmlFor="password">
                PASSWORD
              </label>
              <br />
              <input
                value={password}
                onChange={this.passwordInput}
                placeholder="PASSWORD"
                className="inputEle"
                id="password"
                type="password"
              />
              <br />
              {showSubmitError && <p className="error-message">{errorMssg}</p>}
              <button className="submit-btn" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
