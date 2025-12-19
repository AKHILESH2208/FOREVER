import '../css/MovieCard.css'
import { useMovieContext } from '../Context/MovieContext'


function MovieCard({movie}){
    const {favourites,isFavorite,addToFavorites,removeFromFavorites} = useMovieContext()
    const favorite=isFavorite(movie.imdbID)

    function onFavoriteClick(e){
        e.preventDefault()
        if(favorite) removeFromFavorites(movie.imdbID)
        else addToFavorites(movie)
    }


    return <div className="movie-card">
        <div className="movie-poster">
            <img src={movie.Poster} alt={movie.Title}/>
            <div className="movie-overlay">
                <button className={`favourite-btn ${favorite?"active":""}`} onClick={onFavoriteClick}>
                    🤍
                </button>
            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
        </div>
    </div>
}
export default MovieCard