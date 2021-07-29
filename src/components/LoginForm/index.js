import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    token: '',
  }

  componentDidMount() {
    this.getToken()
  }

  getToken = async () => {
    const apiUrl =
      'https://api.themoviedb.org/3/authentication/token/new?api_key=775d52ea0309004d7d0bf77872e6ad08'
    const response = await fetch(apiUrl)
    const fetchedData = await response.json()
    this.setState({token: fetchedData.request_token})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('request_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password, token} = this.state
    const userDetails = {username, password, request_token: token}
    const apiUrl =
      'https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=775d52ea0309004d7d0bf77872e6ad08'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-type': 'application/json',
      },
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    console.log(fetchedData)
    if (response.ok === true) {
      this.onSubmitSuccess(fetchedData.request_token)
    } else {
      this.onSubmitFailure(fetchedData.status_message)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label label-username" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    const jwtToken = Cookies.get('request_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {showSubmitError, errorMsg} = this.state
    return (
      <div className="login-form-container">
        <div className="movie-logo">
          <img
            src="https://res.cloudinary.com/strawhat/image/upload/v1626578425/m_tuquqo.svg"
            alt="m-icon"
            className="m-icon"
          />
          <img
            src="https://res.cloudinary.com/strawhat/image/upload/v1626578425/o_c2elzc.svg"
            alt="o-icon"
            className="o-icon"
          />
          <img
            src="https://res.cloudinary.com/strawhat/image/upload/v1626578425/v_a0ihs1.svg"
            alt="v-icon"
            className="v-icon"
          />
          <img
            src="https://res.cloudinary.com/strawhat/image/upload/v1626578425/i_m6cg0q.svg"
            alt="i-icon"
            className="i-icon"
          />
          <img
            src="https://res.cloudinary.com/strawhat/image/upload/v1626578425/e_hrtqem.svg"
            alt="e-icon"
            className="e-icon"
          />
          <img
            src="https://res.cloudinary.com/strawhat/image/upload/v1626578425/s_hygmk2.svg"
            alt="s-icon"
            className="s-icon"
          />
        </div>
        <form className="form-container" onSubmit={this.submitForm}>
          <h1 className="sign-in">Sign in</h1>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <div>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </div>
          <button type="submit" className="login-btn">
            Sign in
          </button>
        </form>
      </div>
    )
  }
}

export default LoginForm
