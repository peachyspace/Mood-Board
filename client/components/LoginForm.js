import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 20
  },
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '80%',

    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  failedLogin: {
    color: 'red'
  }
}))
const LoginForm = ({
  email,
  password,
  handleEmailChange,
  handlePasswordChange,
  onSubClick,
  loginMsg,
  error
}) => {
  const classes = useStyles()
  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h1">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            value={email}
            onChange={e => handleEmailChange(e)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={password}
            onChange={e => handlePasswordChange(e)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Grid container>
            <Grid item>
              {loginMsg === '' ? null : (
                <Typography className={classes.failedLogin}>
                  {loginMsg}
                </Typography>
              )}

              {error &&
                error.response && (
                  <Typography className={classes.failedLogin}>
                    {' '}
                    {error.response.data}
                  </Typography>
                )}
              <Button
                type="submit"
                fullWidth={false}
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={e => onSubClick(e)}
              >
                <Typography component="h6" variant="h6">
                  Login
                </Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Button
                style={{marginTop: '2em', marginRight: '1em'}}
                variant="contained"
                color="secondary"
                component="a"
                href="/auth/Google"
                className={classes.button}
              >
                <Typography component="h6" variant="h6">
                  Login With Google
                </Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default LoginForm
