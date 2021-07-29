import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ],
}

class ReactSlider extends Component {
  state = {netflixOriginals: []}

  componentDidMount() {
    this.fetchNetflixOriginalsData()
  }

  fetchNetflixOriginalsData = () => {
    const {category} = this.props
    fetch(category.url)
      .then(response => response.json())
      .then(response => {
        this.setState({netflixOriginals: response.results})
      })
  }

  renderSlider = () => {
    const {netflixOriginals} = this.state

    return (
      <Slider {...settings}>
        {netflixOriginals.map(movie => {
          const linkPath = `/movie/${movie.id}`
          const movieImage = `https://image.tmdb.org/t/p/original/${movie.poster_path}`
          return (
            <Link to={linkPath}>
              <img
                alt={movie.title}
                className="poster"
                src={movieImage}
                width="90%"
                height="100%"
              />
            </Link>
          )
        })}
      </Slider>
    )
  }

  render() {
    const {category} = this.props
    const {netflixOriginals} = this.state

    return (
      <div className="slick-app-container">
        <div className="category-name-container">
          <h1 className="category-name">{category.name}</h1>
        </div>
        <div style={{width: '80%'}}>
          {netflixOriginals.length ? (
            this.renderSlider()
          ) : (
            <p style={{textAlign: 'center'}}>Loading...................</p>
          )}
        </div>
      </div>
    )
  }
}

export default ReactSlider
