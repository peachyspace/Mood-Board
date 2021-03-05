import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
/**
 * COMPONENT
 */
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
export const UserHome = ({email, name, lastName, username}) => {
  //const {email, name} = props
  console.log(lastName)
  const classes = useStyles()
  console.log('username: ', username)
  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h1">
          Welcome, {name} {lastName}
        </Typography>
        <Typography component="h3" variant="h3">
          info:{email}
        </Typography>
      </div>
    </Container>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    name: state.user.firstName,
    lastName: state.user.name,
    username: state.user.username
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  lastName: PropTypes.string,
  username: PropTypes.string
}
