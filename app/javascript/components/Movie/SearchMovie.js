import React from 'react'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
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

const SearchMovie = props => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  const classes = useStyles();

  const handleChange = (event) => {
    event.preventDefault()
    setSearchTerm(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const data = {
      params: {
        search_term: searchTerm,
      }
    };
    Axios.get('/api/v1/movie_search', data)
      .then(res => {
        setSearchResults(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const addMovie = (index) => {
    const movieList = [...searchResults];

    const review_data = {
      review: {
        user_id: props.user.id,
        movie_id: movieList[index]['id'],
      }
    };


    Axios.post('/api/v1/reviews', review_data)
      .then(res => {
        movieList[index]['already_reviewed'] = true
        setSearchResults(movieList)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Search Movies
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Search movies and add them to your list.
            </Typography>
            <TextField
              label="Search Movie"
              fullWidth
              autoFocus
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton
                      onClick={handleSubmit}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              id="movie"
              name="movie"
              value={searchTerm}
              onChange={handleChange}
            />
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {searchResults.map((movie, index) => (
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
                  <CardActions>
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
                      <Button
                        variant="contained"
                        color="primary"
                        style={{
                          margin: '0 auto', display: "flex"
                        }}
                        onClick={() => addMovie(index)}
                      >
                        Add Movie
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  )
}

export default SearchMovie
