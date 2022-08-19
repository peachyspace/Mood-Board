import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import {
  fetchAMoodboard,
  fetchUserMoodboards,
  deleteMoodboard,
  me
} from '../store'
import {Button, Grid} from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import {useHistory} from 'react-router-dom'
import brownPaperTextured from '../../public/images/brownPaperTextured.jpg'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },

  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  cardRoot: {
    display: 'flex',
    flexDirection: 'column'
  },
  /*   details: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }, */
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
}))
export const UserHome = ({
  email,
  name,
  lastName,
  userId,
  moodboards,
  getMoodboards,
  getSelecetedMoodboard,
  removeMoodboard,
  getMe
}) => {
  const classes = useStyles()
  const history = useHistory()
  useEffect(() => {
    getMoodboards(userId)
    getMe()
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

  const removeSelectedMoodboard = async (e, moodboardId) => {
    try {
      e.preventDefault()
      await removeMoodboard(userId, moodboardId)
    } catch (error) {
      console.log(error)
    }
  }

  const userHasMoodboards = moodboards && moodboards.length
  return (
    <Grid>
      <Container style={{marginBottom: '7em'}}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h1">
            Welcome, {name} {lastName}
          </Typography>
          <Typography component="h3" variant="h3">
            {email}
          </Typography>
          {userHasMoodboards ? (
            <Typography component="h3" variant="h3" style={{marginTop: '2em'}}>
              Your Moodboards
            </Typography>
          ) : (
            <Typography component="h3" variant="h3" style={{marginTop: '2em'}}>
              Time To Create Your Moodboard
            </Typography>
          )}
        </div>
        <Grid container direction="column" alignItems="center">
          <Grid
            item
            container
            direction="column"
            style={{
              width: '50%',
              marginTop: '2em'
            }}
          >
            {moodboards &&
              moodboards.map(moodboard => (
                <Card
                  className={classes.cardRoot}
                  key={moodboard.id}
                  style={{
                    marginBottom: '3em',
                    width: '100%',
                    backgroundImage: `url(${brownPaperTextured})`
                  }}
                >
                  <div className="details">
                    <CardContent>
                      <Typography component="h3" variant="h3">
                        {moodboard.title}
                      </Typography>
                      <Typography
                        component="h5"
                        variant="h5"
                        style={{color: '#4d4848'}}
                      >
                        {moodboard.description}
                      </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                      <Button
                        onClick={e => {
                          handleSelecetedMoodboard(e, moodboard.id)
                        }}
                      >
                        <Typography
                          component="h6"
                          variant="h6"
                          style={{color: 'black'}}
                        >
                          Edit
                        </Typography>
                      </Button>

                      <Button
                        onClick={e => {
                          removeSelectedMoodboard(e, moodboard.id)
                        }}
                      >
                        <Typography component="h6" variant="h6">
                          Delete
                        </Typography>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}

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
    },
    removeMoodboard: (userId, moodboardId) => {
      dispatch(deleteMoodboard(userId, moodboardId))
    },
    getMe: () => {
      dispatch(me())
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
  lastName: PropTypes.string
}
