import { Switch, Route, Redirect } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Appbar from './components/AppBar/AppBar';

const HomePage = lazy(() =>
  import('./views/HomePage' /* webpackChunkName: "home-page" */),
);
const Moviespage = lazy(() =>
  import('./views/MoviesPage' /* webpackChunkName: "movies-page" */),
);
const MoviesDetailsPage = lazy(() =>
  import(
    './views/MovieDetailsPage' /* webpackChunkName: "movies-details-page" */
  ),
);

export default function App() {
  return (
    <div>
      <Appbar />
      <Suspense fallback={<h1>Загружаем...</h1>}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <Moviespage />
          </Route>

          <Route path="/movies/:movieId">
            <MoviesDetailsPage />
          </Route>
          <Redirect to="/"></Redirect>
        </Switch>
      </Suspense>
    </div>
  );
}
