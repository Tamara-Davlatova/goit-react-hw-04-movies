import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import * as movieShelfAPI from '../servises/bookshelf-api';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const { url } = useRouteMatch();
  const location = useLocation();

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
              <Link
                to={{
                  pathname: `${url}movies/${movie.id}`,
                  state: { from: location },
                }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
