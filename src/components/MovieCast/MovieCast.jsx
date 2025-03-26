import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import css from './MovieCast.module.css'

export default function MovieCast() {
    
    const [cast, setCast] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        async function  fetchMovieCast() {
            try{
                const API_KEY = '65e63a43c258a7dd70aa0c13e1b1fe41';
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`);
                setCast(response.data.cast);
                
            } catch(error) {
                console.log(error);
            }
        }
        fetchMovieCast();
    }, [movieId])

    return(
        <ul className={css.list}>
            {cast.map(({name, character, id }) => (
                <li key={id}>
                    <p>{name} - {character}</p>
                </li>
            ))}
        </ul>
    )
}