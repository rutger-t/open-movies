import React from 'react';
import { FaStar } from  'react-icons/fa';

const MovieRating = (props) => {
  const movie = props.movies[props.index]

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <FaStar
            className="star"
            color={ratingValue <= movie['vote_average'] ? "#ffc107" : "#e4e5e9"}
            size={25}
            key={i}
          />
        );
      })}
      <p style={{margin: 0}}>{movie['vote_average']} stars based on {movie['vote_count']} ratings</p>
    </div>
  );
}

export default MovieRating
