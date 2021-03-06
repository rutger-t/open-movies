import React from 'react';
import { FaStar } from  'react-icons/fa';

const StarRating = (props) => {
  const [hover, setHover] = React.useState(null);

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
              onClick={() => props.setRating(ratingValue)}
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || props.rating) ? "#ffc107" : "#e4e5e9"}
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

export default StarRating
