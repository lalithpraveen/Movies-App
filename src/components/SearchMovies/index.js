import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {BsChevronLeft, BsChevronRight} from 'react-icons/bs'

import Header from '../Header'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class SearchMovies extends Component {
  state = {
    searchResults: [],
    isLoading: true,
    searchValue: '',
    totalResults: '',
    pageNumber: 1,
  }

  componentDidMount() {
    this.getSearchResults()
  }

  getSearchResults = async () => {
    const {pageNumber} = this.state
    const {match} = this.props
    const {params} = match
    const {value} = params
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=775d52ea0309004d7d0bf77872e6ad08&language=en-US&query=${value}&page=${pageNumber}`
    const token = Cookies.get('request_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(searchUrl, options)
    const resultsData = await response.json()
    console.log(resultsData)
    this.setState({
      searchResults: resultsData.results,
      isLoading: false,
      searchValue: value,
      totalResults: resultsData.total_results,
    })
  }

  renderSearchResults = () => {
    const {searchResults, searchValue, totalResults} = this.state
    if (totalResults === 0) {
      return (
        <div className="no-search-results-card">
          <img
            src="https://res.cloudinary.com/strawhat/image/upload/v1627452608/oh_oh_peezqi.png"
            className="no-results-image"
            alt="no-results"
          />
          <p className="no-results-error">
            Your search for <span>{searchValue}</span> did not find any matches.
          </p>
        </div>
      )
    }
    return (
      <>
        <div className="search-results-container">
          {searchResults.map(eachMovie => {
            const movieImgUrl = `https://image.tmdb.org/t/p/original/${eachMovie.poster_path}`
            const moviePath = `/movie/${eachMovie.id}`
            return (
              <Link to={moviePath}>
                <img
                  className="sp-similar-movie-img"
                  alt={eachMovie.title}
                  src={movieImgUrl}
                />
              </Link>
            )
          })}
        </div>
      </>
    )
  }

  onClickDecrement = () => {
    const {pageNumber} = this.state

    if (pageNumber > 1) {
      this.setState(
        prevState => ({pageNumber: prevState.pageNumber - 1}),
        this.getSearchResults,
      )
    }
  }

  onClickIncrement = () => {
    const {pageNumber} = this.state

    if (pageNumber < 20) {
      this.setState(
        prevState => ({pageNumber: prevState.pageNumber + 1}),
        this.getSearchResults,
      )
    }
  }

  renderPagination = () => {
    const {pageNumber} = this.state
    return (
      <div className="pagination-container">
        <button
          type="button"
          onClick={this.onClickDecrement}
          className="pagination-button"
        >
          <BsChevronLeft className="pagination-icon" />
        </button>
        <p className="page-number">
          <span>{pageNumber}</span> of 20
        </p>
        <button
          type="button"
          onClick={this.onClickIncrement}
          className="pagination-button"
        >
          <BsChevronRight className="pagination-icon" />
        </button>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <div className="search-background-container">
          <Header />
          {isLoading ? (
            <div testid="loader" className="loader-container">
              <Loader type="TailSpin" color="red" height={50} width={100} />
              <p className="loading-description">loading...</p>
            </div>
          ) : (
            <div>
              {this.renderSearchResults()}
              {this.renderPagination()}
            </div>
          )}
        </div>
      </>
    )
  }
}

export default SearchMovies
