import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Axios from 'axios';

const MovieInfoDialog = (props) => {
  const [open, setOpen] = React.useState(false);
  const [dataReceived, setDataReceived] = React.useState(false);
  const [movieDetails, setMovieDetails] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getMovieInfo = () => {

    const data = {
      params: {
        movie_id: props.movie_id,
      }
    };

    Axios.get('/api/v1/movie_info', data)
      .then(res => {
        setMovieDetails(res.data)
        setDataReceived(true)
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
          margin: 'auto',
          marginBottom: '20px',
          display: "flex"
        }}
        color="primary"
        onClick={() => {
          handleClickOpen();
          getMovieInfo();
        }}
      >
        More Info
      </Button>
      { dataReceived ? (
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <Typography variant="h4" color="textPrimary" gutterBottom>
              {movieDetails.original_title} ({movieDetails.release_year})
            </Typography>
            {movieDetails.release_date} ・ {movieDetails.runtime}m ・
              {movieDetails.genres.map((genre, index) => {
                return (
                  genre.name + (index < movieDetails.genres.length - 1 ? ', ' : '')
                );
              })}
            <Typography style={{marginTop: '20px'}} variant="h6" color="textPrimary" gutterBottom>
              Overview
            </Typography>
            <Divider style={{marginBottom: '20px'}} />
            <DialogContentText>
              {movieDetails.overview}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
              }}
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        null
      )}
    </div>
  );
}

export default MovieInfoDialog
