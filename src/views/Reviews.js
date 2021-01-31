import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as movieShelfAPI from '../servises/bookshelf-api';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    movieShelfAPI.fetchMovieReviews(movieId).then(r => setReviews(r.results));
  }, [movieId]);

  return (
    <>
      {reviews.length === 0 ? (
        <h2>We don't have any reviews for this movie...</h2>
      ) : (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h2>author: {review.author}</h2>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
