import { useEffect, useState, useRef  } from "react";
import MovieList from "../../components/MovieList/MovieList"
import css from './MoviesPage.module.css';
import { useSearchParams } from "react-router-dom";
import findMoviesAPI from "../../api";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

export default function MoviesPage({ }){
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query") || "";
    const [value, setValue] = useState(query);
    const [moviesPage, setMoviesPage] = useState([]);
    const location = useLocation();
    const prevLocation = useRef(location.state);

    const handleSubmit = (ev) => {
        ev.preventDefault(); 
        if (!value.trim()) {
            toast("Input cannot be empty!", { position: "top-right" });
            return;
        }
        setSearchParams({ query: value });
    }

    useEffect(() => {
        if (!query) return;
        const SearchMovie = async () => {
            try {
                const data = await findMoviesAPI(query);
                if (data.length === 0) {
                    toast("No findings", { position: "top-right" });
                }
                setMoviesPage(data);
            } catch (error) {
                toast("Something went wrong", { position: "top-right" });
            }
        };

        SearchMovie();
        
}, [query])


    return(
        <div className={css.container}>
        <form className={css.form} onSubmit={handleSubmit}>
        <input className={css.input}  
            type="text" 
            placeholder="Movie name"
            autoFocus
            onChange={(ev) => setValue(ev.target.value)}/>
            <button className={css.button} type="submit">Search</button>
        </form>
            <MovieList movies={moviesPage}/>
            
        </div>
    )
}