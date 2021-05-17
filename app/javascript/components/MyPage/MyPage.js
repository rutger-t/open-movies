import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import MovieCard from '../Movie/MovieCard';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
  errorAlert: {
    marginTop: '10px'
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
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

const MyPage = (props) => {
  const [loading, setLoading] = React.useState(true);
  const [alert, setAlert] = React.useState();
  const [userMovies, setUserMovies] = React.useState();
  const [displayResult, setDisplayResult] = React.useState(false);
  const classes = useStyles();

  React.useEffect(() => {
    setDisplayResult(false)
    Axios.get('/api/v1/review_list').then(
      res => {
        setLoading(false)
        setUserMovies(res.data)
        setDisplayResult(true)
      },
      err => {
        console.log(err)
        setLoading(false)
        setAlert(err.message)
      }
    );
  }, []);

  return (
    <>
      <CssBaseline />
      {alert ? <Alert severity='error' className={classes.errorAlert}>{alert}</Alert> : <></> }
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              MyPage
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Your list of rated movies
            </Typography>
          </Container>
        </div>
        { loading ? (
          <div style={{marginTop: "15px"}}>
            <center>
              <CircularProgress size={50} />
            </center>
          </div>
        ) : (
          displayResult ? <MovieCard movieResults={userMovies} user={props.user} /> : <div><center>No movies found</center></div>
        )}
      </main>
    </>
  )
}

export default MyPage
