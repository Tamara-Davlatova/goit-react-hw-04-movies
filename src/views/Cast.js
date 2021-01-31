import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import defaultImage from '../Images/forma-dlya-rozmalovuvannya-siluet-ludini-68400924551895_small11.jpg';
import * as movieShelfAPI from '../servises/bookshelf-api';

export default function Cast() {
  const { movieId } = useParams();
  const [actors, setActors] = useState();
  const imgUrl = 'https://image.tmdb.org/t/p/w500/';
  useEffect(() => {
    movieShelfAPI.fetchMovieActors(movieId).then(r => setActors(r.cast));
  }, [movieId]);

  return (
    <>
      {actors && (
        <ul>
          {actors.map(actor => (
            <li key={actor.id}>
              {actor.profile_path === null ? (
                <img src={defaultImage} alt="defaultImage" width="200px"></img>
              ) : (
                <img
                  src={`${imgUrl}${actor.profile_path}`}
                  alt={actor.name}
                  width="200px"
                ></img>
              )}

              <p>{actor.name}</p>
              <p>character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
