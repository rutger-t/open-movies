import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Alert from '@material-ui/lab/Alert';
import { CircularProgress } from '@material-ui/core';
import Axios from 'axios';
import MovieCard from './MovieCard'

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(10, 0, 6),
  },
}));

const SearchMovie = props => {
  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [displayResult, setDisplayResult] = React.useState(false);
  const classes = useStyles();

  const handleChange = (event) => {
    event.preventDefault()
    setSearchTerm(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setDisplayResult(false)
    setLoading(true)

    const data = {
      params: {
        search_term: searchTerm,
      }
    };
    Axios.get('/api/v1/movie_search', data)
      .then(res => {
        setLoading(false)
        setSearchResults(res.data)
        setDisplayResult(true)
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
        setAlert(err.message)
      })
  }

  return (
    <>
      <CssBaseline />
      {alert ? <Alert severity='error' className={classes.errorAlert}>{alert}</Alert> : <></> }
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
        { loading ? (
          <div style={{marginTop: "15px"}}>
            <center>
              <CircularProgress size={50} />
            </center>
          </div>
        ) : (
          displayResult ? <MovieCard movieResults={searchResults} user={props.user} /> : null
        )}
      </main>
    </>
  )
}

export default SearchMovie
