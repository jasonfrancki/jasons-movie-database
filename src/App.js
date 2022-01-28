import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Movie from './SingleMovie'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:movieId" element={<Movie />} />
    </Routes>
  )
}

export default App
