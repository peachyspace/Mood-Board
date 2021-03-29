import React, {useCallback, useState, useEffect} from 'react'
//import Dropzone from './Dropzone'
//import ListOfAllUploadedImages from './ListOfAllUploadedImages'
import cuid from 'cuid'
import update from 'immutability-helper'
import {connect} from 'react-redux'
import {canvasSaver, fetchAMoodboard} from '../store'
import CanvasBoard from './Canvas'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import {Button, Grid} from '@material-ui/core'
import MoodboardForm from './MoodboardForm'
//import { height } from '@material-ui/system'

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
function EditPage({
  saveMoodboard,
  match,
  getMoodboard,
  oneMoodboard,
  state,
  canvasFormat,
  canvasHeight,
  canvasWidth,
  canvasTitle,
  canvasDescription,
  canvasBC
}) {
  const classes = useStyles()
  const moodboardId = match.params.moodboardId
  const userId = match.params.userId
  //const accepts = 'IMAGE'
  const [images, setImages] = useState([])
  const [format, setFormat] = useState('')
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

  const saveButtonClick = async (e, canvasObject) => {
    e.preventDefault()
    console.log('canvasObject: ', canvasObject)
    const canvasString = JSON.stringify(
      canvasObject.toObject(['height', 'width'])
    )
    const backgroundColor = JSON.stringify(canvasObject.backgroundColor)
    const heightOfCanvas = canvasObject.height
    const widthOfCanvas = canvasObject.width

    try {
      await saveMoodboard(
        userId,
        moodboardId,
        canvasString,
        format ? format : canvasFormat,
        heightOfCanvas,
        widthOfCanvas,
        backgroundColor,
        title.length > 0 ? title : canvasTitle,
        description.length > 0 ? description : canvasDescription
      )

      setHeaderTitle(title)
      setHeaderDescription(description)
      setTitle('')
      setDescription('')
      await getMoodboard(userId, moodboardId)
    } catch (error) {
      console.error(error)
    }
  }
  console.log('state: ', state)
  // onDrop function
  /* const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
    // Loop through accepted files
    acceptedFiles.map(file => {
      // Initialize FileReader browser API
      const readerOfFiles = new FileReader()
      // onload callback gets called after the readerOfFiles reads the file data
      readerOfFiles.onload = function(e) {
        // add the image into the state. Since FileReader reading process is asynchronous, its better to get the latest snapshot state (i.e., prevState) and update it.
        setImages(prevState => [
          ...prevState,
          {id: cuid(), src: e.target.result}
        ])
      }
      // Read the file as Data URL (since we accept only images)
      readerOfFiles.readAsDataURL(file)
      return file
    })
  }, []) */
  //might not need this
  /*  const moveImage = (dragIndex, hoverIndex) => {
    const draggedImage = images[dragIndex]
    setImages(
      update(images, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, draggedImage]]
      })
    )
  } */

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
  //const descrip = ''||

  const display = () => {
    let testText = 'moodboard description'
    if (showAll) {
      return (
        <div>
          {headerDescription.length === 0
            ? descriptionOfCanvas
            : headerDescription}{' '}
        </div>
      )
    } else {
      return (
        <div>
          {headerDescription.length === 0
            ? descriptionOfCanvas
              ? descriptionOfCanvas.substring(0, 20)
              : testText.substring(0, 20)
            : headerDescription.substring(0, 20)}
        </div>
      )
    }
  }

  /* const preview = headerDescription.length===0 ? descriptionOfCanvas.substring(0,20) : headerDescription.substring(0,20) */

  const popover = {
    position: 'absolute',
    zIndex: '2'
  }
  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px'
  }

  let moodKeys = Object.keys(oneMoodboard)
  let hasMoodboard = oneMoodboard && moodKeys.length
  console.log(canvasBC)

  console.log(canvasHeight)
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
      {hasMoodboard ? (
        <div>
          <CanvasBoard
            images={images[0]}
            saveButtonClick={saveButtonClick}
            moodboardCanvas={oneMoodboard}
            setFormat={setFormat}
            canvasFormat={canvasFormat}
            canvasHeight={canvasHeight}
            canvasWidth={canvasWidth}
            canvasTitle={canvasTitle}
            canvasBC={canvasBC}
          />
        </div>
      ) : (
        <h4>No canvas</h4>
      )}
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
export default connect(mapState, mapDispatch)(EditPage)
