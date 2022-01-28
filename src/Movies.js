import React from 'react'
import { useGlobalContext } from './context'
import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading'
import './Movies.css'

const Movies = () => {
  const { movies, isLoading } = useGlobalContext()

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

  if (movies.length === 0) {
    return <h2 className="noResults">No Results</h2>
  }

  return (
    <section className="movies">
      {movies.map((movie) => {
        if (
          movie.poster_path !== null &&
          movie.overview !== '' &&
          movie.vote_count > 0
        ) {
          return (
            <Link key={movie.id} to={`/movie/${movie.id}`} className="movie">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt=""
              />
            </Link>
          )
        } else return null
      })}
    </section>
  )
}

export default Movies
