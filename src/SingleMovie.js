import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading'
import { Typography, Rating, Button, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import './SingleMovie.css'

const Movie = () => {
  const { movieId } = useParams()
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const fetchMovie = async () => {
    setIsLoading(true)
    const response = await fetch(
      `https://jasons-api-proxy.herokuapp.com/api/movie/${movieId}`
    )
    const data = await response.json()
    setMovie(data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchMovie()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return (
      <ReactLoading
        className="loading"
        type="spokes"
        color="black"
        height={'10%'}
        width={'10%'}
      />
    )
  }

  // Get release year from format example: "2022-03-01"
  const year = movie.release_date.slice(0, 4)

  // Calculate runtime in hours / minutes
  const hours = Math.floor(movie.runtime / 60)
  const minutes = movie.runtime % 60
  const runtime = `${hours}h ${minutes}m`

  return (
    <div className="singleMovie">
      <div className="close-button">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <IconButton>
            <CloseIcon fontSize="large" color="action" />
          </IconButton>
        </Link>
      </div>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt=""
      />
      <h2 className="whiteBackground">{movie.title}</h2>
      <br />
      <h5 className="whiteBackground">
        {year} - {runtime}
      </h5>
      <Typography
        style={{
          width: '75px',
          margin: 'auto',
          fontSize: '1.25rem',
          backgroundColor: 'white',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
        component="legend"
      >
        {movie.vote_average}/10
      </Typography>
      <Rating
        className="whiteBackground"
        name="customized-10"
        value={movie.vote_average}
        precision={0.1}
        max={10}
        readOnly
      />
      <p className="whiteBackground">{movie.overview}</p>
      <div
        className="background"
        style={{
          zIndex: -3,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`,
          opacity: 0.3,
        }}
      ></div>
      <br></br>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button style={{ backgroundColor: 'white' }} variant="outlined">
          Go back
        </Button>
      </Link>
    </div>
  )
}

export default Movie
