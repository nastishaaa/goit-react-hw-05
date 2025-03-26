import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'; 
import css from './MovieReviews.module.css'

export default function MovieReviews() {

    const [review, setReview] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        async function fetchReviews(){
            try{
                const API_KEY = '65e63a43c258a7dd70aa0c13e1b1fe41';
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}`);
                setReview(response.data.results);
            } catch(error){
                console.log(error);
                
            }
            
        }
        fetchReviews();
    }, [movieId])

    return(
        <ul className={css.list}>
            {review.map(({ author, content, updated_at, id }) => (
                <li key={id}>
                    <p>{author}</p>
                    <p>{content}</p>
                    <p>{updated_at}</p>
                </li>
            ))}
        </ul>
    )
}