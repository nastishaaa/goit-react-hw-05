import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import css from './MovieDetailsPage.module.css';
import { Link, Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState({});
    const location = useLocation();
    const navigate = useNavigate();

    const goBack = () => {
        navigate(location.state?.from || "/movies");
    };

    useEffect(() => {
        async function fetchMovieDetails() {
            try {
                const API_KEY = '65e63a43c258a7dd70aa0c13e1b1fe41';
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
                setMovie(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchMovieDetails();
    }, [movieId]);

    return (
        <div className={css.container}>
            <button onClick={goBack}>Go back</button>
            {movie.backdrop_path ? (
                <img 
                    className={css.backdrop} 
                    src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`} 
                    alt={movie.title} 
                />
            ) : (
                <div className={css.noImage}>No Image Available</div> 
            )}

            <h2>{movie.title} ({movie.original_title})</h2>
            
            <p><strong>Tagline:</strong> {movie.tagline || "No tagline available"}</p>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Popularity:</strong> {movie.popularity}</p>

            {movie.overview && (
                <div>
                    <h3>Overview:</h3>
                    <p>{movie.overview}</p>
                </div>
            )}

            <ul className={css.navDetails}>
                <li className={css.castSlide}><Link to="cast">Cast</Link></li>
                <li className={css.castSlide}><Link to="reviews">Reviews</Link></li>
            </ul>
            
            <Outlet />
            
        </div>
    );
}
