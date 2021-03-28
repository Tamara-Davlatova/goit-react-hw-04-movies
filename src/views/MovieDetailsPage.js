import { useState, useEffect, lazy, Suspense } from 'react';

import {
  useParams,
  NavLink,
  Route,
  useRouteMatch,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';

import * as movieShelfAPI from '../servises/bookshelf-api';
import s from './MovieDetailsPage.module.css';

const Cast = lazy(() => import('./Cast.js' /* webpackChunkName: "cast" */));
const Reviews = lazy(() =>
  import('./Reviews.js' /* webpackChunkName: "reviews" */),
);

export default function MoviesDetailsPage() {
  const { movieId } = useParams();
  const history = useHistory();
  const location = useLocation();
  const { url, path } = useRouteMatch();

  const imgUrl = 'https://image.tmdb.org/t/p/w500/';
  const [error, setError] = useState(null);
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    movieShelfAPI.fetchMovieDetails(movieId).then(setMovie).catch(setError);
  }, [movieId]);

  return (
    <>
      {error && history.push('/')}
      <button
        type="button"
        onClick={() => {
          history.push(location?.state?.from ?? '/movies');
        }}
      >
        GO BACK
      </button>
      <br />

      {movie && (
        <div className={s.flex}>
          <img
            src={`${imgUrl}${movie.poster_path}`}
            alt={movie.title}
            width="350px"
          ></img>
          <div className={s.list}>
            <h1>{movie.title}</h1>
            <p>Ratting: {movie.vote_average}</p>
            <h2>Overview</h2>
            <p>{movie.overview}</p>
            <h3>Genres</h3>
            <ul>
              {movie.genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <hr />
      <p>Additional Information</p>
      <nav>
        <ul>
          <li>
            <NavLink exact to={`${url}/cast`}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink exact to={`${url}/reviews`}>
              Reviews
            </NavLink>
          </li>
        </ul>
      </nav>
      <hr />
      <Suspense fallback={<h1>Загружаем...</h1>}>
        <Switch>
          <Route path={`${path}/cast`} exact>
            <Cast />
          </Route>
          <Route path={`${path}/reviews`} exact>
            <Reviews />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}
