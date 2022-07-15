import React, {useState, useEffect, useRef} from 'react'
import {connect} from 'react-redux'
import {saveMoodboard, fetchAMoodboard, me} from '../store'
import CanvasBoard from './Canvas'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import {Grid} from '@material-ui/core'
import EditCanvasTab from './EditCustomTab'
import UpdateTitleAndDescription from './UpdateTitleAndDescription'
import DisplayMoodboardInfo from './DisplayMoodboardInfo'
import Footer from './Footer'

const useStyles = makeStyles(() => ({
  titlesContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  container: {
    marginTop: 50
  }
}))

function EditPage({
  saveAMoodboard,
  match,
  getMoodboard,
  oneMoodboard,
  canvasFormat,
  canvasHeight,
  canvasWidth,
  canvasTitle,
  canvasDescription,
  canvasBC,
  getMe
}) {
  const classes = useStyles()
  const moodboardId = match.params.moodboardId
  const userId = match.params.userId
  const [format, setFormat] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [headerTitle, setHeaderTitle] = useState('')
  const [headerDescription, setHeaderDescription] = useState('')
  const [editCanvas, setEditCanvas] = useState({})
  const [zoomValue, setZoomValue] = useState(100)
  const isMounted = useRef(false)
  useEffect(() => {
    async function fetchMoodboard() {
      await getMoodboard(userId, moodboardId)
      await getMe()
    }
    fetchMoodboard()
  }, [])

  useEffect(
    () => {
      if (isMounted.current) {
        setFormat(canvasFormat)
      } else {
        isMounted.current = true
      }
    },
    [canvasFormat]
  )

  const saveButtonClick = async (e, canvasObject) => {
    e.preventDefault()

    const canvasString = JSON.stringify(
      canvasObject.toObject(['height', 'width'])
    )
    console.log(canvasString)
    const backgroundColor = JSON.stringify(canvasObject.backgroundColor)
    const heightOfCanvas = canvasObject.height
    const widthOfCanvas = canvasObject.width
    try {
      await saveAMoodboard(
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
    } catch (error) {
      console.error(error)
    }
  }

  const titleOfCanvas = oneMoodboard && oneMoodboard.title
  const descriptionOfCanvas = oneMoodboard && oneMoodboard.description

  let moodKeys = Object.keys(oneMoodboard)
  let hasMoodboard = oneMoodboard && moodKeys.length

  return (
    <Grid>
      <Container maxWidth="xs" justify="center">
        <Grid className={classes.titlesContainer}>
          <DisplayMoodboardInfo
            titleOfCanvas={titleOfCanvas}
            headerTitle={headerTitle}
            descriptionOfCanvas={descriptionOfCanvas}
            headerDescription={headerDescription}
          />
          <Grid>
            <UpdateTitleAndDescription
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
            />
          </Grid>
        </Grid>
        {hasMoodboard ? (
          <Container>
            <EditCanvasTab
              canvas={editCanvas}
              canvasBC={canvasBC}
              setFormat={setFormat}
              storedFormat={format}
              zoomValue={zoomValue}
              setZoomValue={setZoomValue}
            />
            <Grid>
              <CanvasBoard
                saveButtonClick={saveButtonClick}
                moodboardCanvas={oneMoodboard}
                setFormat={setFormat}
                storedFormat={format}
                canvasHeight={canvasHeight}
                canvasWidth={canvasWidth}
                canvasTitle={canvasTitle}
                canvasBC={canvasBC}
                setEditCanvas={setEditCanvas}
                zoomValue={zoomValue}
                setZoomValue={setZoomValue}
              />
            </Grid>
          </Container>
        ) : (
          <h4>No canvas</h4>
        )}
      </Container>
      <Grid style={{marginTop: '6em'}}>
        <Footer />
      </Grid>
    </Grid>
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
    saveAMoodboard: (
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
        saveMoodboard(
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
    },
    getMe: () => dispatch(me())
  }
}
export default connect(mapState, mapDispatch)(EditPage)
