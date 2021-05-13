import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import MovieInfoDialog from './MovieInfoDialog'
import MovieRating from '../Review/MovieRating'
import RateMovie from '../Review/RateMovie'
import Divider from '@material-ui/core/Divider';

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
              <CardHeader
                title={movie.original_title}
                subheader={<MovieRating movies={movies} index={index} />}
              />
              <CardContent className={classes.cardContent}>
              </CardContent>
              <CardActions style={{display: "block"}}>
                <MovieInfoDialog movie_id={movie.id} />
                <Divider variant="middle" />
                <RateMovie movies={movies} setMovies={setMovies} user={props.user} movieIndex={index} />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default MovieCard
