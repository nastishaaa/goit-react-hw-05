import css from './MovieList.module.css'
import MovieItem from '../MovieItem/MovieItem';

export default function MovieList({ movies }) {
    return (
      <ul className={css.list}>
        <MovieItem movies={movies}/>
      </ul>
    );
  }
  
  