import MovieList from "../../components/MovieList/MovieList"

export default function MoviesPage({ movies, onChange, onSubmit }){
    return(
        <>
        <form onSubmit={onSubmit}>
        <input 
            type="text" 
            placeholder="Movie name"
            autoFocus
            onChange={onChange}/>
            <button type="submit">Search</button>
        </form>
            <MovieList movies={movies}/>
            
        </>
    )
}