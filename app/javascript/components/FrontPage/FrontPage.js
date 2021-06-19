import React from 'react'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

const cards = [
  {
    id: 1,
    title: '1. Search Movie',
    description: 'Search for a movie that you want to review',
    image: '1616530940355-351fabd9524b'
  },
  {
    id: 2,
    title: '2. Rate Movie',
    description: 'Once you find the movie you searched for, rate it!',
    image: '1569513589209-18a39b58bcbd'
  },
  {
    id: 3,
    title: '3. MyPage',
    description: 'Check your rated movies on your own page',
    image: '1512070679279-8988d32161be'
  },
];

const FrontPage = props => {
  const classes = useStyles();
  const isLoggedIn = props.user;

  const menuItems =
    isLoggedIn ?
      [
        {
          title: 'MyPage',
          pageURL: '/mypage',
          style: 'contained'
        },
        {
          title: 'Search Movie',
          pageURL: '/search',
          style: 'outlined'
        }
      ]
    :
      [
        {
          title: 'SignUp',
          pageURL: '/signup',
          style: 'contained'
        },
        {
          title: 'Login',
          pageURL: '/login',
          style: 'outlined'
        }
      ];

    const handleMenuClick = pageURL => {
      window.location = pageURL;
    };

  return (
    <>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              OpenMovies
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              OpenMovies allows you to create a list of your favorite movies and rate them.
              The only thing you have to do is creat an account and you can get started!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                {menuItems.map((menuItem, index) => {
                  return (
                    <Grid item key={index} >
                      <Button variant={menuItem.style} color="primary" onClick={() => handleMenuClick(menuItem.pageURL)}>
                        {menuItem.title}
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
                How To Use OpenMovies
          </Typography>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={
                      "https://images.unsplash.com/photo-" +
                      card.image +
                      "?crop=entropy&cs=tinysrgb&fit=max&fm=jpg" +
                      "&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjI0MDY3ODc1&ixlib=rb-1.2.1&q=80&w=1080"
                    }
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography>
                      {card.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  )
}

export default FrontPage
