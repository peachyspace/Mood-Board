import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
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
  failedSubmit: {
    color: 'red'
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
  setErrors,
  validations,
  emailValidation,
  submitMsg
}) => {
  const classes = useStyles()

  const validate = (validationsArray, value, string) => {
    //map over the validationsArray
    //validationsArray is an array of validators and those validators return error messeges

    setErrors(() => ({
      ...errors,
      [string]: validationsArray
        .map(errorsFor => errorsFor(value))
        .filter(errorMsg => errorMsg.length > 0)
    }))
  }

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h1">
          Sign Up
        </Typography>
        <form className={classes.form}>
          <TextField
            error={errors.firstName.length !== 0}
            value={firstName}
            onChange={e => handleFirstNameChange(e)}
            required={true}
            variant="outlined"
            margin="normal"
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            onBlur={() => validate(validations, firstName, 'firstName')}
            helperText={
              errors.firstName.length === 0 ? null : errors.firstName.join(', ')
            }
          />
          <TextField
            error={errors.lastName.length !== 0}
            value={lastName}
            onChange={e => handleLastNameChange(e)}
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            onBlur={() => validate(validations, lastName, 'lastName')}
            helperText={
              errors.lastName.length === 0 ? null : errors.lastName.join(', ')
            }
          />
          <TextField
            error={errors.username.length !== 0}
            value={username}
            onChange={e => handleUsernameChange(e)}
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="username"
            label="Username"
            name="username"
            onBlur={() => validate(validations, username, 'username')}
            helperText={
              errors.username.length === 0 ? null : errors.username.join(', ')
            }
          />
          <TextField
            error={errors.email.length !== 0}
            value={email}
            onChange={e => handleEmailChange(e)}
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="email"
            label="Email"
            name="email"
            onBlur={() => validate(emailValidation, email, 'email')}
            helperText={
              errors.email.length === 0 ? null : errors.email.join(', ')
            }
          />
          <TextField
            error={errors.password.length !== 0}
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
            onBlur={() => validate(validations, password, 'password')}
            helperText={
              errors.password.length === 0 ? null : errors.password.join(', ')
            }
          />
          <Grid container>
            <Grid item>
              {submitMsg === '' ? null : (
                <Typography className={classes.failedSubmit}>
                  {submitMsg}
                </Typography>
              )}
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
