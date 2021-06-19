import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Axios from 'axios';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  errorAlert: {
    marginTop: '10px'
  },
  paper: {
    marginBottom: theme.spacing(12),
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUpForm = (props) => {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  })
  const [alert, setAlert] = React.useState();

  const classes = useStyles();

  const handleChange = (e) => {
    e.preventDefault()
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      user: {
        email: state.email,
        password: state.password
      }
    };

    Axios.post('users/signup', data)
      .then(res => {
        Axios.post('users/login', data)
        .then(res => {
          const jwt_token = res.headers.authorization.split(' ')[1]
          localStorage.setItem('token', jwt_token);
          window.location = "/";
        })
        .catch(err => {
          console.log(err)
          setAlert(err.response.data.error)
        })
      })
      .catch(err => {
        console.log(err)
        setAlert(err.response.data.error)
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {alert ? <Alert severity='error' className={classes.errorAlert}>{alert}</Alert> : <></> }
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={state.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={state.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create Account
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already Have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignUpForm
