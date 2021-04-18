import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {canvasSaver, fetchAMoodboard} from '../store'
import CanvasBoard from './Canvas'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import {Grid} from '@material-ui/core'
import EditCanvasTab from './EditCustomTab'
import UpdateTitleAndDescription from './UpdateTitleAndDescription'
import DisplayMoodboardInfo from './DisplayMoodboardInfo'

const useStyles = makeStyles(theme => ({
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
  saveMoodboard,
  match,
  getMoodboard,
  oneMoodboard,
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
  const [format, setFormat] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [headerTitle, setHeaderTitle] = useState('')
  const [headerDescription, setHeaderDescription] = useState('')
  const [editCanvas, setEditCanvas] = useState({})

  useEffect(() => {
    async function fetchMoodboard() {
      await getMoodboard(userId, moodboardId)
    }
    fetchMoodboard()
  }, [])

  const saveButtonClick = async (e, canvasObject) => {
    e.preventDefault()

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

  const titleOfCanvas = oneMoodboard && oneMoodboard.title
  const descriptionOfCanvas = oneMoodboard && oneMoodboard.description

  let moodKeys = Object.keys(oneMoodboard)
  let hasMoodboard = oneMoodboard && moodKeys.length

  return (
    <Container maxWidth="xs">
      <Grid className={classes.titlesContainer}>
        <div>
          <DisplayMoodboardInfo
            titleOfCanvas={titleOfCanvas}
            headerTitle={headerTitle}
            descriptionOfCanvas={descriptionOfCanvas}
            headerDescription={headerDescription}
          />
        </div>
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
        <div>
          <Container>
            <div>
              <EditCanvasTab
                canvas={editCanvas}
                canvasBC={canvasBC}
                setFormat={setFormat}
                canvasFormat={canvasFormat}
              />
            </div>
            <Grid>
              <CanvasBoard
                saveButtonClick={saveButtonClick}
                moodboardCanvas={oneMoodboard}
                setFormat={setFormat}
                canvasFormat={canvasFormat}
                canvasHeight={canvasHeight}
                canvasWidth={canvasWidth}
                canvasTitle={canvasTitle}
                canvasBC={canvasBC}
                setEditCanvas={setEditCanvas}
              />
            </Grid>
          </Container>
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
