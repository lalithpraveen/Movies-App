import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {BsChevronLeft, BsChevronRight} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class PopularMovies extends Component {
  state = {popularMovies: [], pageNumber: 1, isLoading: true}

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    const {pageNumber} = this.state
    const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=775d52ea0309004d7d0bf77872e6ad08&language=en-US&page=${pageNumber}`
    const token = Cookies.get('request_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(popularMoviesUrl, options)
    const moviesData = await response.json()
    this.setState({popularMovies: moviesData.results, isLoading: false})
  }

  renderPopularMovies = () => {
    const {popularMovies} = this.state
    return (
      <div className="pop-movies-card">
        {popularMovies.map(eachMovie => {
          const moviePoster = `https://image.tmdb.org/t/p/original/${eachMovie.poster_path}`
          const moviePath = `/movie/${eachMovie.id}`
          return (
            <Link to={moviePath}>
              <img
                src={moviePoster}
                className="pop-movie-image"
                alt={eachMovie.title}
              />
            </Link>
          )
        })}
      </div>
    )
  }

  onClickDecrement = () => {
    const {pageNumber} = this.state

    if (pageNumber > 1) {
      this.setState(
        prevState => ({pageNumber: prevState.pageNumber - 1}),
        this.getPopularMovies,
      )
    }
  }

  onClickIncrement = () => {
    const {pageNumber} = this.state

    if (pageNumber < 20) {
      this.setState(
        prevState => ({pageNumber: prevState.pageNumber + 1}),
        this.getPopularMovies,
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
      <div className="popular-movies-container">
        <Header />
        {isLoading ? (
          <div testid="loader" className="loader-container">
            <Loader type="TailSpin" color="red" height={50} width={100} />
            <p className="loading-description">loading...</p>
          </div>
        ) : (
          <div>
            {this.renderPopularMovies()}
            {this.renderPagination()}
            <Footer />
          </div>
        )}
      </div>
    )
  }
}

export default PopularMovies
