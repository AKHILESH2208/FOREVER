import React from 'react'
import '../css/Favorites.css'
import { useMovieContext } from '../Context/MovieContext'
import MovieCard from '../components/MovieCard'

const Favourites = () => {
  const {favourites}=useMovieContext();
  if(favourites.length > 0){
    return(
      <div className="favorites">
        <h2>Your Favorites</h2>
         <div className="movies-grid">
            {favourites.map(movie=>(
                <MovieCard movie={movie} key={movie.imdbID}/>
            ))}
        </div>
      </div>
     
    )
  }
  return (
    <div className="favourites-empty">
        <h2>No favourite movies yet</h2>
        <p>Start adding movies to your favourites and they will appear here</p>
    </div>
  )
}

export default Favourites