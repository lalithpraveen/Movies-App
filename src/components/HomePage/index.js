import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import ReactSlider from '../ReactSlider'
import Footer from '../Footer'
import './index.css'

const MovieCategories = [
  {
    name: 'Trending',
    url:
      'https://api.themoviedb.org/3/trending/all/week?api_key=775d52ea0309004d7d0bf77872e6ad08',
  },
  {
    name: 'Top Rated',
    url:
      'https://api.themoviedb.org/3/movie/top_rated?api_key=775d52ea0309004d7d0bf77872e6ad08&language=en-US',
  },

  {
    name: 'Original',
    url: `https://api.themoviedb.org/3/discover/tv?api_key=775d52ea0309004d7d0bf77872e6ad08`,
  },
  {
    name: 'UpComing',
    url: `
https://api.themoviedb.org/3/movie/upcoming?api_key=775d52ea0309004d7d0bf77872e6ad08&language=en-US&page=1`,
  },
]

class HomePage extends Component {
  state = {trendingMovie: [], isLoading: true}

  componentDidMount() {
    this.getTrendingMovies()
  }

  getTrendingMovies = async () => {
    const randomNumber = Math.ceil(Math.random() * 20)
    const TrendingUrl =
      'https://api.themoviedb.org/3/trending/all/week?api_key=775d52ea0309004d7d0bf77872e6ad08'
    const jwtToken = Cookies.get('request_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(TrendingUrl, options)
    const fetchedData = await response.json()
    const randomMovie = fetchedData.results[randomNumber]
    this.setState({trendingMovie: randomMovie, isLoading: false})
  }

  renderMoviePoster = () => {
    const {trendingMovie} = this.state
    const imageUrl = `https://image.tmdb.org/t/p/original/${trendingMovie.backdrop_path}`
    return (
      <div
        style={{
          backgroundImage: `url(${imageUrl})`,
          height: 500,
          width: '100vw',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="movie-details-container">
          <h1 className="movie-title">{trendingMovie.title}</h1>
          <p className="movie-description">{trendingMovie.overview}</p>
          <button type="button" className="home-play-btn">
            Play
          </button>
        </div>
      </div>
    )
  }

  renderHomePage = () => (
    <>
      <div className="home-page-top-section">{this.renderMoviePoster()}</div>
      {MovieCategories.map(category => (
        <ReactSlider category={category} />
      ))}
      <Footer />
    </>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div>
        <Header />
        <div className="Home-page-container">
          {isLoading ? (
            <div testid="loader" className="loader-container">
              <Loader type="TailSpin" color="red" height={50} width={100} />
            </div>
          ) : (
            this.renderHomePage()
          )}
        </div>
      </div>
    )
  }
}

export default HomePage
