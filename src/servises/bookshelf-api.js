const BASE_URL = 'https://api.themoviedb.org/3';
const KEY = '73305cb339434d37e6117f3ddb0a9c1f';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchTrendingMovies() {
  return fetchWithErrorHandling(
    `${BASE_URL}/trending/movie/week?api_key=${KEY}`,
  );
}

export function fetchMovie(movieTitle) {
  return fetchWithErrorHandling(
    `${BASE_URL}/search/movie?api_key=${KEY}&language=en-US&query=${movieTitle}&page=1&include_adult=false`,
  );
}

export function fetchMovieDetails(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}?api_key=${KEY}&language=en-US`,
  );
}

export function fetchMovieActors(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${KEY}&language=en-US`,
  );
}

export function fetchMovieReviews(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${KEY}&language=en-US&page=1`,
  );
}
