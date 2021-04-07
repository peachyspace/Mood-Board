import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {canvasSaver, fetchAMoodboard} from '../store'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import {Button, Grid} from '@material-ui/core'
import MoodboardForm from './MoodboardForm'

const useStyles = makeStyles(theme => ({
  titlesContainer: {
    marginTop: 70,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  container: {
    marginTop: 50
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

const intialErrors = {
  title: [],
  description: []
}
const isRequried = val => {
  return val.length > 0 ? '' : 'Type here to change value'
}
function UpdateTitleAndDescription({
  saveMoodboard,
  match,
  getMoodboard,
  oneMoodboard,
  state,
  canvasFormat,
  canvasDescription
}) {
  const classes = useStyles()
  const moodboardId = match.params.moodboardId
  const userId = match.params.userId
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState(intialErrors)
  const [displayForm, setDisplayForm] = useState(false)
  const [headerTitle, setHeaderTitle] = useState('')
  const [headerDescription, setHeaderDescription] = useState('')
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    async function fetchMoodboard() {
      console.log('INSIDE: ', userId)
      await getMoodboard(userId, moodboardId)
    }
    fetchMoodboard()
  }, [])

  console.log('state: ', state)

  const handleFormClick = e => {
    e.preventDefault()
    setDisplayForm(!displayForm)
  }

  const handleFormClose = e => {
    e.preventDefault()
    setDisplayForm(false)
  }
  const showMore = () => {
    setShowAll(true)
  }
  const showLess = () => {
    setShowAll(false)
  }

  const titleOfCanvas = oneMoodboard && oneMoodboard.title
  const descriptionOfCanvas = oneMoodboard && oneMoodboard.description

  const display = () => {
    let testText = 'moodboard description'
    if (showAll) {
      return (
        <Typography component="h5" variant="h5">
          {headerDescription.length === 0
            ? descriptionOfCanvas
            : headerDescription}{' '}
        </Typography>
      )
    } else {
      return (
        <Typography component="h5" variant="h5">
          {headerDescription.length === 0
            ? descriptionOfCanvas
              ? `${descriptionOfCanvas.substring(0, 20)}....`
              : testText.substring(0, 20)
            : `${headerDescription.substring(0, 20)}....`}
        </Typography>
      )
    }
  }

  /* const preview = headerDescription.length===0 ? descriptionOfCanvas.substring(0,20) : headerDescription.substring(0,20) */

  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px'
  }

  let moodKeys = Object.keys(oneMoodboard)
  let hasMoodboard = oneMoodboard && moodKeys.length

  return (
    <Container maxWidth="xs">
      <Grid className={classes.titlesContainer}>
        <Typography component="h1" variant="h1">
          Edit Your Moodboard
        </Typography>
        <Typography component="h3" variant="h3">
          {headerTitle.length === 0 ? titleOfCanvas : headerTitle}
        </Typography>
        {display()}
        {showAll ? (
          <div>
            <Button onClick={showLess}>
              <Typography component="h6" variany="h6">
                show less
              </Typography>
            </Button>
          </div>
        ) : (
          <div>
            <Button onClick={showMore}>
              <Typography component="h6" variant="h6">
                show more
              </Typography>
            </Button>
          </div>
        )}
        <Grid container justify="center">
          <Grid container direction="row" style={{marginTop: '1em'}}>
            <Grid
              item
              container
              className={classes.container}
              alignItems="center"
              style={{marginTop: '1em', marginLeft: '1em'}}
            >
              <Grid item style={{marginLeft: '2em'}}>
                <Button onClick={e => handleFormClick(e)}>
                  {' '}
                  <Typography component="h6" variant="h6">
                    Update Title and Description
                  </Typography>
                </Button>
                {displayForm ? (
                  <div /* style={popover} */>
                    <div style={cover} onClick={e => handleFormClose(e)} />
                    <Grid item style={{marginLeft: '2em', marginBottom: '1em'}}>
                      <MoodboardForm
                        title={title}
                        handleTitleChange={e => {
                          setTitle(e.target.value)
                        }}
                        description={description}
                        handleDescriptionChange={e => {
                          setDescription(e.target.value)
                        }}
                        errors={errors}
                        setErrors={setErrors}
                        validations={[isRequried]}
                      />
                    </Grid>
                  </div>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
const mapState = state => {
  return {
    userId: state.user.id,
    moodboards: state.moodboards,
    oneMoodboard: state.singleMoodboard,
    canvasFormat: state.singleMoodboard.format,
    canvasHeight: state.singleMoodboard.height,
    canvasWidth: state.singleMoodboard.width,
    canvasTitle: state.singleMoodboard.title,
    canvasDescription: state.singleMoodboard.description,
    canvasBC: state.singleMoodboard.backgroundColor,
    state: state
  }
}
const mapDispatch = dispatch => {
  return {
    saveMoodboard: (
      userId,
      moodboardId,
      fabricCanvas,
      format,
      height,
      width,
      backgroundColor,
      title,
      description
    ) => {
      dispatch(
        canvasSaver(
          userId,
          moodboardId,
          fabricCanvas,
          format,
          height,
          width,
          backgroundColor,
          title,
          description
        )
      )
    },
    getMoodboard: (userId, moodboardId) => {
      dispatch(fetchAMoodboard(userId, moodboardId))
    }
  }
}
export default connect(mapState, mapDispatch)(UpdateTitleAndDescription)
