import { createContext,useState,useContext,useEffect } from "react";

const MovieContext = createContext()

export const useMovieContext=()=> useContext(MovieContext)

export const MovieProvider=({children})=>{
    const [favourites,setFavorites]=useState([])

    useEffect(()=>{
        const storedFavs =  localStorage.getItem("favorites")

        if(storedFavs)setFavorites(JSON.parse(storedFavs))
    },[])

    useEffect(()=>{
        localStorage.setItem("favorites",JSON.stringify(favourites))
    },[favourites])

    const addToFavorites=(movie)=>{
        setFavorites(prev=>[...prev,movie])
    }

    const removeFromFavorites=(movieID)=>{
        setFavorites(prev=>prev.filter(movie=>movie.imdbID!==movieID))
    }

    const isFavorite=(movieID)=>{
        return favourites.some(movie=>movie.imdbID==movieID)
    }

    const value={
        favourites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}