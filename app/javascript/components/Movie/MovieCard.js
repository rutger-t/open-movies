import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ReviewDialogue from './ReviewDialogue'

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const MovieCard = (props) => {
  const [movies, setMovies] = React.useState(props.movieResults);
  const classes = useStyles();

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {movies.map((movie, index) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={"https://image.tmdb.org/t/p/w500/" + movie.backdrop_path}
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {movie.original_title}
                </Typography>
                <Typography>
                  {movie.overview}
                </Typography>
              </CardContent>
              <CardActions style={{display: "block"}}>
                { movie.already_reviewed ? (
                  <Button
                    variant="contained"
                    style={{
                      margin: '0 auto', display: "flex"
                    }}
                  >
                    Added Movie
                  </Button>
                ) : (
                  <ReviewDialogue movie={movie} movies={movies} setMovies={setMovies} user={props.user} movieIndex={index} />
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default MovieCard
