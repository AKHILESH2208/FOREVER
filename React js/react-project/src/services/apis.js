const API_KEY = "YOUR-API-KEY";
const BASE_URL = "http://www.omdbapi.com/";

// Search movies by query
export const searchMovies = async (query) => {
    try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
        const data = await response.json();
        return data.Search || [];
    } catch (error) {
        console.error("Error searching movies:", error);
        return [];
    }
};

// Get popular movies (search for common terms since OMDB doesn't have a popular endpoint)
export const getPopularMovies = async () => {
    try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=movie&type=movie`);
        const data = await response.json();
        return data.Search || [];
    } catch (error) {
        console.error("Error fetching popular movies:", error);
        return [];
    }
};

// Get movie details by ID
export const getMovieDetails = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return null;
    }
};;
