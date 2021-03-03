import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
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
  }
}))
const SignUpForm = ({
  firstName,
  handleFirstNameChange,
  lastName,
  handleLastNameChange,
  username,
  handleUsernameChange,
  email,
  handleEmailChange,
  password,
  handlePasswordChange,
  onSignUpButtonClick,
  errors,
  focused,
  setFocusedTrue,
  setFocusedFalse,
  isRequried,
  validate
}) => {
  const classes = useStyles()
  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h1">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            value={firstName}
            onChange={e => handleFirstNameChange(e)}
            required={true}
            variant="outlined"
            margin="normal"
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            onFocus={() => setFocusedTrue()}
            onBlur={() => {
              setFocusedFalse()
              validate([isRequried])
            }}
          />
          <TextField
            value={lastName}
            onChange={e => handleLastNameChange(e)}
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoFocus
          />
          <TextField
            value={username}
            onChange={e => handleUsernameChange(e)}
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
          />
          <TextField
            value={email}
            onChange={e => handleEmailChange(e)}
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoFocus
          />
          <TextField
            value={password}
            onChange={e => handlePasswordChange(e)}
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="password"
            label="Password"
            type="password"
            name="password"
            autoFocus
          />
          <Grid container>
            <Grid item>
              <Button
                type="submit"
                fullWidth={false}
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={e => onSignUpButtonClick(e)}
              >
                <Typography component="h6" variant="h6">
                  Sign Up
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
export default SignUpForm
