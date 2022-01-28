import React, { useState, useContext, useEffect, createContext } from 'react'

export const API_ENDPOINT = 'https://jasons-api-proxy-server.herokuapp.com/api/'

const AppContext = createContext()

// Example Requests
//
// Search
// https://jasons-api-proxy-server.herokuapp.com/api/search?query=batman
//
// Get Movie Details
// https://jasons-api-proxy-server.herokuapp.com/api/movie/414906
//
// Get Now Playing Movies
// https://jasons-api-proxy-server.herokuapp.com/api/movie/now_playing

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState({ show: false, msg: '' })
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState('')

  const fetchMovies = async (url) => {
    setIsLoading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (data.total_results > 0) {
        setMovies(data.results)
        setError({ show: false, msg: '' })
      } else {
        if (query === '') {
          fetchMovies(`${API_ENDPOINT}/movie/now_playing`)
        } else {
          setMovies([])
          setError({ show: true, msg: 'No movies found' })
        }
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMovies(`${API_ENDPOINT}/movie/now_playing`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchMovies(`${API_ENDPOINT}/search?query=${query}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return (
    <AppContext.Provider value={{ isLoading, error, movies, query, setQuery }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppProvider }
