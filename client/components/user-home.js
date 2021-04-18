import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import {fetchAMoodboard, fetchUserMoodboards} from '../store'
import {Button, Grid} from '@material-ui/core'
import {Link, useHistory} from 'react-router-dom'

/**
 * COMPONENT
 */
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    marginTop: 50,
    flexWrap: 'nowrap'
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
export const UserHome = ({
  email,
  name,
  lastName,
  userId,
  moodboards,
  getMoodboards,
  getSelecetedMoodboard
}) => {
  const classes = useStyles()
  const history = useHistory()
  useEffect(() => {
    getMoodboards(userId)
  }, [])

  const handleSelecetedMoodboard = async (e, moodboardId) => {
    try {
      e.preventDefault()
      await getSelecetedMoodboard(userId, moodboardId)
      history.push(`/edit/${userId}/${moodboardId}`)
      location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const userHasMoodboards = moodboards && moodboards.length
  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h1">
          Welcome, {name} {lastName}
        </Typography>
        <Typography component="h3" variant="h3">
          {email}
        </Typography>
      </div>
      <div className={classes.root}>
        <Grid container>
          <Grid container className={classes.container} justify="center">
            {userHasMoodboards ? (
              <Typography component="h3" variant="h3">
                Your Moodboards
              </Typography>
            ) : (
              <Typography component="h3" variant="h3">
                User has no moodboards
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid container direction="row" style={{marginTop: '5em'}}>
          <Grid item container style={{width: '100%'}}>
            <Grid item container direction="column" style={{width: 100}}>
              {moodboards &&
                moodboards.map(moodboard => (
                  <Grid key={moodboard.id}>
                    <Grid
                      item
                      container
                      className={classes.container}
                      alignItems="center"
                      style={{marginTop: '4em', marginLeft: '6em'}}
                    >
                      <Grid item style={{marginLeft: '2em'}}>
                        <Typography variant="h3">{moodboard.title}</Typography>
                      </Grid>
                      <Grid item style={{marginLeft: '2em'}}>
                        <Typography variant="h5">
                          Description: {moodboard.description}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        component={Link}
                        to={`/edit/${userId}/${moodboard.id}`}
                        key={moodboard.id}
                        style={{marginLeft: '2em'}}
                      >
                        <Button
                          onClick={e => {
                            handleSelecetedMoodboard(e, moodboard.id)
                          }}
                        >
                          <Typography component="h6" variant="h6">
                            Edit
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
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
    userId: state.user.id,
    moodboards: state.moodboards
  }
}
const mapDispatch = dispatch => {
  return {
    getMoodboards: userId => {
      dispatch(fetchUserMoodboards(userId))
    },
    getSelecetedMoodboard: (userId, moodboardId) => {
      dispatch(fetchAMoodboard(userId, moodboardId))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  lastName: PropTypes.string,
  username: PropTypes.string
}
