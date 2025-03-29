import { useState, useEffect } from 'react';
import { lazy, Suspense } from "react";
import './App.css';
import { Route, Routes, NavLink } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import findMoviesAPI from './api';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetails/MovieDetailsPage'));
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews'));

function App() {

  const [movies, setMovies] = useState([]);
  const [moviesPage, setMoviesPage] = useState([]);
  const [value, setValue] = useState('');

  const SearchMovie = async (value) => {

    if (!value || value.trim() === '') {
      toast("Input cannot be empty!", {
        position: "top-right",
    });
    return;
    }
    const data = await findMoviesAPI(value);
    if(data.length === 0){
      toast("No findings", 
        {position: "top-right", });
    }
    setMoviesPage(data);
  }

  const handleSubmit = (ev) => {
    ev.preventDefault(); 
    SearchMovie(value);
  }
  
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
  

  return (
    <>    
    <Toaster position="top-right" reverseOrder={false} />
    <div className="container">
    <Suspense fallback={<div>Loading...</div>}>
      <nav>
          <NavLink to="/" >
            Home
          </NavLink>
          <NavLink to="/movies" >
            Movies
          </NavLink>
      </nav>
    </Suspense>
    </div>
    
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage movies={movies} />} />
          <Route path="/movies" element={<MoviesPage movies={moviesPage} 
          onChange={(ev) => setValue(ev.target.value)} 
          onSubmit={handleSubmit}/>} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />} >
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App;
