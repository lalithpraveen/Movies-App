import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {BiSearchAlt2} from 'react-icons/bi'
import {CgProfile, CgPlayListSearch} from 'react-icons/cg'

import MovieLogo from '../MoviesLogo'
import './index.css'

class Header extends Component {
  state = {searchInput: '', showSearchIcon: true, showHamburgerMenu: false}

  onClickSearchIcon = () => {
    this.setState({showSearchIcon: false})
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="nav-input-container">
        <input
          type="search"
          className="nav-input-box"
          placeholder="search"
          value={searchInput}
          onChange={this.onChangeSearch}
        />
        <Link to={`search/${searchInput}`}>
          <BiSearchAlt2 className="search-icon" />
        </Link>
      </div>
    )
  }

  onClickHamburgerIcon = () => {
    const {showHamburgerMenu} = this.state
    if (showHamburgerMenu === true) {
      this.setState({showHamburgerMenu: false})
    } else {
      this.setState({showHamburgerMenu: true})
    }
  }

  renderHamburgerMenu = () => (
    <div className="hamburger-menu-card">
      <Link to="/" className="header-link">
        <h1 className="hamburger-heading">Home</h1>
      </Link>
      <Link to="/popular" className="header-link">
        <h1 className="hamburger-heading">Popular</h1>
      </Link>
      <Link to="/account" className="header-link">
        <h1 className="hamburger-heading">Account</h1>
      </Link>
    </div>
  )

  render() {
    const {showSearchIcon, showHamburgerMenu} = this.state
    return (
      <nav className="nav-header">
        <div className="nav-card">
          <MovieLogo />
          <ul className="nav-contents">
            <Link to="/" className="header-link">
              <li className="home-element">Home</li>
            </Link>
            <Link to="/popular" className="header-link">
              <li>Popular</li>
            </Link>
          </ul>
          <ul className="search-card">
            <li>
              {showSearchIcon ? (
                <BiSearchAlt2
                  className="search-icon initial-icon"
                  onClick={this.onClickSearchIcon}
                />
              ) : (
                this.renderSearchInput()
              )}
            </li>
            <Link to="/account" className="profile-header-link">
              <li>
                <div className="profile-card">
                  <CgProfile className="profile-icon" />
                </div>
              </li>
            </Link>
          </ul>
          <div className="mobile-view-nav">
            {showSearchIcon ? (
              <BiSearchAlt2
                className="mobile-search-icon"
                onClick={this.onClickSearchIcon}
              />
            ) : (
              this.renderSearchInput()
            )}
            {showHamburgerMenu && this.renderHamburgerMenu()}
            <CgPlayListSearch
              className="playlist-search-icon"
              onClick={this.onClickHamburgerIcon}
            />
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
