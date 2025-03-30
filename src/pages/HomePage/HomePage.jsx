import css from './HomePage.module.css'
import MovieList from '../../components/MovieList/MovieList'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function HomePage(){
    
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchMovies() {
            const API_KEY = '65e63a43c258a7dd70aa0c13e1b1fe41';
            const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
            const options = {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWU2M2E0M2MyNThhN2RkNzBhYTBjMTNlMWIxZmU0MSIsIm5iZiI6MTc0MjkwMDIzMS43OTAwMDAyLCJzdWIiOiI2N2UyOGMwNzE2YTNjNWMyMjRmMDVlNDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Gj5KKh_5hoQkblhe7TtEiniX_OhNq0TGx1HwRS_dyOs'
            }
    };
    
        try{
            const resp = await axios.get(url, options);
            setMovies(resp.data.results);
            
        } catch {
            toast('Something went wrong. Try again!', 
                {position: 'top-right'});
            } 
        }
        fetchMovies();
    }, []);

    return <MovieList movies={movies}/>
}