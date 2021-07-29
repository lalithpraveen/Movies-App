import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import Header from '../Header'
import './index.css'

class Account extends Component {
  //   state = {accountDetails: []}

  //   componentDidMount() {
  //     this.getAccountDetails()
  //   }

  //   getAccountDetails = async () => {
  //     const accountUrl = `https://api.themoviedb.org/3/account?api_key=775d52ea0309004d7d0bf77872e6ad08`
  //     const token = Cookies.get('request_token')
  //     const options = {
  //       method: 'GET',
  //       header: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //     const response = await fetch(accountUrl, options)
  //     const fetchedData = await response.json()
  //     console.log(fetchedData)
  //   }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('request_token')
    history.replace('/login')
  }

  render() {
    return (
      <div className="account-page-container">
        <div className="account-navbar-background">
          <Header />
        </div>
        <h1 className="account-heading">Account</h1>
        <hr className="horizontal-line" />
        <div className="membership-card">
          <h1 className="membership-title">Member ship</h1>
          <div>
            <p className="membership-email">praveenkmv18@gmail.com</p>
            <p className="member-password">
              <span className="password-text">Password :</span> **********
            </p>
          </div>
        </div>
        <hr className="horizontal-line" />
        <div className="membership-card">
          <h1 className="membership-title">Plan details </h1>
          <div className="premium-card">
            <p className="premium">Premium </p>
            <p className="membership-type">Ultra HD</p>
          </div>
        </div>
        <hr className="horizontal-line" />
        <button type="button" onClick={this.onClickLogout} className="logout">
          Logout
        </button>
      </div>
    )
  }
}

export default withRouter(Account)
