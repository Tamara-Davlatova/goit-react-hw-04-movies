import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import * as movieShelfAPI from '../servises/bookshelf-api';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const { url } = useRouteMatch();

  useEffect(() => {
    movieShelfAPI.fetchTrendingMovies().then(r => setMovies(r.results));
  }, []);

  return (
    <>
      <h1>Tranding today</h1>
      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`${url}movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
