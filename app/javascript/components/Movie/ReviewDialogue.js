import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import StarRating from '../Review/StarRating';
import Axios from 'axios';

const FormDialog = (props) => {
  const [open, setOpen] = React.useState(false);
  const [rating, setRating] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addMovie = (index) => {
    const movieList = [...props.movies];

    const review_data = {
      review: {
        user_id: props.user.id,
        movie_id: movieList[index]['id'],
        score: (rating * 20),
      }
    };

    Axios.post('/api/v1/reviews', review_data)
      .then(res => {
        movieList[index]['already_reviewed'] = true
        props.setMovies(movieList)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
      <Button
        variant="contained"
        style={{
          margin: '0 auto', display: "flex"
        }}
        color="primary"
        onClick={handleClickOpen}
      >
        Rate It
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Rate the movie and see it on your page
          </DialogContentText>
          <StarRating rating={rating} setRating={setRating} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
            }}
            color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              addMovie(props.movieIndex);
            }}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog
