import { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes, NavLink } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import findMoviesAPI from './api';

import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import MovieDetailsPage from './pages/MovieDetails/MovieDetailsPage';
import MovieCast from './components/MovieCast/MovieCast';
import MovieReviews from './components/MovieReviews/MovieReviews ';

function App() {

  const [movies, setMovies] = useState([]);
  const [value, setValue] = useState('');

  const API_KEY = '65e63a43c258a7dd70aa0c13e1b1fe41';
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
  
  const SearchMovie = async (value) => {

    if (!value || value.trim() === '') {
      toast("Input cannot be empty!", {
        position: "top-right",
    });
    return;
    }
    const data = await findMoviesAPI(value);
    setMovies(data);
  }

  const hendleSubmit = (ev) => {
    ev.preventDefault(); 
    SearchMovie(value);
  }
  
  useEffect(() => {
    async function fetchMovies() {
      try{
        const resp = await axios.get(url);
        setMovies(resp.data.results);
        
      } catch(error){
        console.log(error);
      } 
    }
    fetchMovies();
  }, []);
  

  return (
    <>    
    <Toaster position="top-right" reverseOrder={false} />
    <nav>
        <NavLink to="/" >
          Home
        </NavLink>
        <NavLink to="/movies" >
          Movies
        </NavLink>
        
    </nav>

      <Routes>
        <Route path="/" element={<HomePage movies={movies} />} />
        <Route path="/movies" element={<MoviesPage movies={movies} 
        onChange={(ev) => setValue(ev.target.value)} 
        onSubmit={hendleSubmit}/>} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} >
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
