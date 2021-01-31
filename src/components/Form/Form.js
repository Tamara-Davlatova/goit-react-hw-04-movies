import { useState } from 'react';

export default function Form({ onSubmit }) {
  const [movieTitle, setMovieTitle] = useState('');
  const handleFormChange = e => {
    setMovieTitle(e.currentTarget.value.toLowerCase());
  };
  const handeFormSubmit = e => {
    e.preventDefault();
    if (movieTitle.trim() === '') {
      alert('enter movie title');
      return;
    }
    onSubmit(movieTitle);
    setMovieTitle('');
  };

  return (
    <>
      <form onSubmit={handeFormSubmit}>
        <input
          type="text"
          value={movieTitle}
          onChange={handleFormChange}
          placeholder="enter movie title"
        />
        <button type="submit">search</button>
      </form>
    </>
  );
}
