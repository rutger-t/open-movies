import React from 'react';
import { FaStar } from  'react-icons/fa';
import Axios from 'axios';

const RateMovie = (props) => {
  const movieList = [...props.movies];
  const movieIndex = props.movieIndex;
  const [hover, setHover] = React.useState(null);
  const [rating, setRating] = React.useState(movieList[movieIndex]['user_score']);

  const addMovie = (clicked_rating) => {
    const hasRating = rating
    setRating(clicked_rating)

    const review_data = {
      review: {
        user_id: props.user.id,
        movie_id: movieList[movieIndex]['id'],
        score: (clicked_rating * 20),
      }
    };

    { hasRating ? (
      Axios.patch('/api/v1/review_update', review_data)
        .then(res => {
          props.setMovies(movieList)
        })
        .catch(err => {
          console.log(err)
        })
    ) : (
      Axios.post('/api/v1/reviews', review_data)
        .then(res => {
          props.setMovies(movieList)
        })
        .catch(err => {
          console.log(err)
        })
    )}
  }

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
         <label>
           <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => {
                addMovie(ratingValue)
              }}
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              size={50}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
}

export default RateMovie
