import { Suspense } from "react";
import { Route, Routes, NavLink } from 'react-router-dom';
import { lazy } from "react";

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetails/MovieDetailsPage'));
const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../../components/MovieReviews/MovieReviews'));

export default function Navigation() {

    return(
        <>
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
    
        <Suspense fallback={<h2>Loading...</h2>}>
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
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