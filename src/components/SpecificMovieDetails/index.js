import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

class SpecificMovieDetails extends Component {
  state = {movieDetails: [], similarMovies: [], isLoading: true}

  componentDidMount() {
    this.getMovieDetails()
    this.getSimilarMovies()
  }

  getMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const getMovieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=775d52ea0309004d7d0bf77872e6ad08&language=en-US`
    const token = Cookies.get('request_token')
    const options = {
      method: 'GET',
      header: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(getMovieUrl, options)
    const fetchedData = await response.json()
    console.log(`specic movie details => ${fetchedData}`)
    this.setState({movieDetails: fetchedData})
  }

  getSimilarMovies = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const getSimilarMovieUrl = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=775d52ea0309004d7d0bf77872e6ad08&language=en-US&page=1`
    const token = Cookies.get('request_token')
    const options = {
      method: 'GET',
      header: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(getSimilarMovieUrl, options)
    const fetchedData = await response.json()
    this.setState({similarMovies: fetchedData.results, isLoading: false})
  }
  
  onClickSimilarMovie = () => {
    this.setState(
      {isLoading: true},
      this.getMovieDetails,
    )
    this.getSimilarMovies()
  }

  renderSimilarMovies = () => {
    const {similarMovies} = this.state
    return (
      <>
        {similarMovies.map(eachMovie => {
          const movieImgUrl = `https://image.tmdb.org/t/p/original/${eachMovie.poster_path}`
          const moviePath = `/movie/${eachMovie.id}`
          return (
            <Link to={moviePath} onClick={this.onClickSimilarMovie}>
              <img
                className="sp-similar-movie-img"
                alt={eachMovie.title}
                src={movieImgUrl}
              />
            </Link>
          )
        })}
      </>
    )
  }

  renderSpecificMovieDetails = () => {
    const {movieDetails} = this.state
    const inCrores = Math.round(movieDetails.budget / 10000000)
    console.log(movieDetails)
    const movieImageUrl = `https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`
    return (
      <>
        <div
          className="sp-movie-container"
          style={{
            backgroundImage: `url(${movieImageUrl})`,
            backgroundSize: 'cover',
          }}
        >
          <Header />

          <div className="sp-movie-details-container">
            <h1 className="sp-movie-title">{movieDetails.title}</h1>
            <em className="sp-sub-details">{movieDetails.runtime} minutes</em>
            <em className="sp-sub-details">{movieDetails.release_date}</em>
            <p className="sp-movie-description">{movieDetails.overview}</p>
            <button type="button" className="play-btn">
              Play
            </button>
          </div>
        </div>
        <div className="sp-movie-details-card">
          <div className="each-category">
            <p className="sp-category-name">Genres</p>
            <ul className="category-list-elements">
              {movieDetails.genres.map(genre => (
                <li className="each-element" key={genre.id}>
                  {genre.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="each-category">
            <p className="sp-category-name">Audio Available</p>
            <ul className="category-list-elements">
              {movieDetails.spoken_languages.map(eachItem => (
                <li className="each-element" key={eachItem.name}>
                  {eachItem.english_name}
                </li>
              ))}
            </ul>
          </div>
          <div className="each-category">
            <p className="sp-category-name">Rating Count</p>
            <p className="each-element">{movieDetails.vote_count}</p>
            <br />
            <p className="sp-category-name">Rating Average</p>
            <p className="each-element">{movieDetails.vote_average}</p>
          </div>
          <div className="each-category">
            <p className="sp-category-name">Budget</p>
            <p className="each-element">{inCrores} Cores</p>
            <br />
            <p className="sp-category-name">Release Date</p>
            <p className="each-element">{movieDetails.release_date}</p>
          </div>
        </div>
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        {isLoading ? (
          <div className="sp-movie-details-loader">
            <div testid="loader" className="loader-container">
              <Loader type="TailSpin" color="red" height={50} width={100} />
            </div>
          </div>
        ) : (
          <>
            {this.renderSpecificMovieDetails()}
            <ul className="similar-movies-container">
              {this.renderSimilarMovies()}
            </ul>
          </>
        )}
      </>
    )
  }
}

export default SpecificMovieDetails
