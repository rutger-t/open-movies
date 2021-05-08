import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MovieCard from '../Movie/MovieCard';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
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
  const [userMovies, setUserMovies] = React.useState();
  const [displayResult, setDisplayResult] = React.useState(false);
  const classes = useStyles();

  React.useEffect(() => {
    setDisplayResult(false)
    Axios.get('/api/v1/review_list').then(
      res => {
        setUserMovies(res.data)
        setDisplayResult(true)
      },
      err => {
        console.log(err)
      }
    );
  }, []);

  return (
    <>
      <CssBaseline />
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
        { displayResult ? <MovieCard movieResults={userMovies} user={props.user} /> : null }
      </main>
    </>
  )
}

export default MyPage
