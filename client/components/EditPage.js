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
import {Grid} from '@material-ui/core'
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
function EditPage({
  saveMoodboard,
  match,
  getMoodboard,
  oneMoodboard,
  state,
  canvasFormat,
  canvasHeight,
  canvasWidth
}) {
  const classes = useStyles()
  const moodboardId = match.params.moodboardId
  const userId = match.params.userId
  const [userCanvas, setUserCanvas] = useState({})
  //intial value of the images state is an array
  const accepts = 'IMAGE'
  const [images, setImages] = useState([])

  const [index, setindex] = useState(0)
  const [board, setBoard] = useState('')
  const [format, setFormat] = useState('')
  const [height, setHeight] = useState(canvasHeight)
  const [width, setWidth] = useState(canvasWidth)

  useEffect(() => {
    async function fetchMoodboard() {
      console.log('INSIDE: ', userId)
      await getMoodboard(userId, moodboardId)
      setBoard(oneMoodboard)
    }
    fetchMoodboard()
  }, [])

  const saveButtonClick = async (e, canvasObject) => {
    e.preventDefault()
    console.log('canvasObject: ', canvasObject)
    setUserCanvas(canvasObject)
    const canvasString = JSON.stringify(
      canvasObject.toObject(['height', 'width'])
    )
    //console.log('canvasString: ',canvasString)

    try {
      if (!format) {
        console.log('THE      canvasFormat: ', canvasFormat)

        await saveMoodboard(
          userId,
          moodboardId,
          canvasString,
          canvasFormat,
          height,
          width
        )
      } else {
        await saveMoodboard(
          userId,
          moodboardId,
          canvasString,
          format,
          height,
          width
        )
      }
    } catch (error) {
      console.error(error)
    }
  }
  console.log('state: ', state)
  // onDrop function
  const onDrop = useCallback(acceptedFiles => {
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
  }, [])
  //might not need this
  const moveImage = (dragIndex, hoverIndex) => {
    const draggedImage = images[dragIndex]
    setImages(
      update(images, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, draggedImage]]
      })
    )
  }

  const canvasTitle = oneMoodboard && oneMoodboard.title
  const canvasDescription = oneMoodboard && oneMoodboard.description

  let moodKeys = Object.keys(oneMoodboard)
  let hasMoodboard = oneMoodboard && moodKeys.length

  return (
    <Container maxWidth="xs">
      <Grid className={classes.titlesContainer}>
        <Typography component="h1" variant="h1">
          Edit Your Moodboard
        </Typography>
        <Typography component="h3" variant="h3">
          {canvasTitle}
        </Typography>
        <Typography component="h6" variant="h6">
          {canvasDescription}
        </Typography>
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
            setHeight={setHeight}
            setWidth={setWidth}
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
      width
    ) => {
      dispatch(
        canvasSaver(userId, moodboardId, fabricCanvas, format, height, width)
      )
    },
    getMoodboard: (userId, moodboardId) => {
      dispatch(fetchAMoodboard(userId, moodboardId))
    }
  }
}
export default connect(mapState, mapDispatch)(EditPage)
