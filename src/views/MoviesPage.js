import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import Form from '../components/Form/Form';
import * as movieShelfAPI from '../servises/bookshelf-api';

export default function MoviesPage() {
  const [movies, setMovies] = useState(null);
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const getMovieTitle = movieTitle => {
    history.push({
      ...location,
      search: `query=${movieTitle}`,
    });
  };

  const movieTitle = new URLSearchParams(location.search).get('query');
  useEffect(() => {
    if (movieTitle === null) {
      return;
    }

    movieShelfAPI.fetchMovie(movieTitle).then(r => setMovies(r.results));
  }, [movieTitle]);

  return (
    <>
      <Form onSubmit={getMovieTitle} />
      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`${url}/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
