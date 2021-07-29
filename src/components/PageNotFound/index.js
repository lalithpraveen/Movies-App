import {Component} from 'react'
import {withRouter} from 'react-router-dom'

import Header from '../Header'
import './index.css'

class PageNotFound extends Component {
  onClickHome = () => {
    const {history} = this.props
    history.replace('/')
  }

  render() {
    return (
      <div className="page-not-found-container">
        <div className="pg-header-nav">
          <Header />
        </div>
        <div className="page-error-card">
          <h1 className="page-error-heading">Lost Your Way ?</h1>
          <p className="page-error-description">
            Sorry, we can’t find that page. You’ll find lots to explore on the
            home page{' '}
          </p>
          <button
            type="button"
            onClick={this.onClickHome}
            className="netflix-home-btn"
          >
            Netflix Home
          </button>
          <h1 className="error-type">
            Error : <span>NSES:404</span>
          </h1>
        </div>
      </div>
    )
  }
}

export default withRouter(PageNotFound)
