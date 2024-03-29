import React, {useState} from 'react'
import {connect} from 'react-redux'
import {createAMoodboard} from '../store'
import CanvasBoard from './Canvas'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import {Grid} from '@material-ui/core'
import MoodboardForm from './MoodboardForm'
import CreateCustomTab from './CreateCustomTab'

const useStyles = makeStyles(() => ({
  titlesContainer: {
    marginTop: 70,
    display: 'flex',
    flexDirection: 'column',
    justify: 'center'
  },
  container: {
    marginTop: 70,
    alignItems: 'center'
  },

  failedSubmit: {
    color: 'red'
  }
}))
const intialErrors = {
  title: [],
  description: []
}
const isRequried = val => {
  return val.length > 0 ? '' : 'cannot be blank'
}

function CreatePage({idOfUser, createMoodboard}) {
  const classes = useStyles()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState(intialErrors)
  const [submitMsg, setSubmitMsg] = useState('')
  const [userCanvas, setUserCanvas] = useState({})
  const [format, setFormat] = useState('Spotify Playlist Cover')
  const [createHeight, setCreateHeight] = useState(300)
  const [createWidth, setCreateWidth] = useState(300)
  const [createBackgroundColor, setCreateBackgroundColor] = useState({
    r: 250,
    g: 0,
    b: 0.2,
    a: 1
  })
  const [zoomValue, setZoomValue] = useState(100)

  const createButtonClick = async e => {
    if (title.length !== 0 && description.length !== 0) {
      try {
        e.preventDefault()
        const canvasString = JSON.stringify(
          userCanvas.toObject(['height', 'width'])
        )
        const backgroundColor = JSON.stringify(createBackgroundColor)
        await createMoodboard(
          idOfUser,
          title,
          description,
          canvasString,
          format,
          createHeight,
          createWidth,
          backgroundColor
        )
      } catch (error) {
        console.error(error)
      }
    } else {
      e.preventDefault()
      setSubmitMsg('Submission Failed')
    }
  }

  const getTitle = () => {
    let createTilte
    if (title === '') {
      createTilte = 'untitled'
    } else {
      createTilte = title
    }
    return createTilte
  }

  return (
    <Grid>
      <Container maxWidth="xs" justify="center">
        <Grid
          item
          container
          className={classes.container}
          justify="center"
          style={{marginTop: '3em'}}
        >
          <MoodboardForm
            title={title}
            handleTitleChange={e => {
              setTitle(e.target.value)
            }}
            description={description}
            handleDescriptionChange={e => {
              setDescription(e.target.value)
            }}
            validations={[isRequried]}
            errors={errors}
            setErrors={setErrors}
          />
        </Grid>
        <CreateCustomTab
          userCanvas={userCanvas}
          setCreateBackgroundColor={setCreateBackgroundColor}
          createBackgroundColor={createBackgroundColor}
          setFormat={setFormat}
          createFormat={format}
          setCreateHeight={setCreateHeight}
          setCreateWidth={setCreateWidth}
          zoomValue={zoomValue}
          setZoomValue={setZoomValue}
        />
        <Grid>
          <CanvasBoard
            createButtonClick={createButtonClick}
            create="create"
            setUserCanvas={setUserCanvas}
            createHeight={createHeight}
            createWidth={createWidth}
            getTitle={getTitle}
            createFormat={format}
            zoomValue={zoomValue}
            setZoomValue={setZoomValue}
          />
        </Grid>

        <Grid container justify="center">
          <Grid item container justify="center">
            {submitMsg === '' ? null : (
              <Typography className={classes.failedSubmit}>
                {submitMsg}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}
const mapState = state => {
  return {
    idOfUser: state.user.id,
    state: state
  }
}
const mapDispatch = dispatch => {
  return {
    createMoodboard: (
      userId,
      title,
      description,
      canvas,
      format,
      height,
      width,
      backgroundColor
    ) => {
      dispatch(
        createAMoodboard(
          userId,
          title,
          description,
          canvas,
          format,
          height,
          width,
          backgroundColor
        )
      )
    }
  }
}
export default connect(mapState, mapDispatch)(CreatePage)
