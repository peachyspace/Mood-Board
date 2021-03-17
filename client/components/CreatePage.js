import React, {useCallback, useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {canvasSaver, fetchAMoodboard, createAMoodboard} from '../store'
import CanvasBoard from './Canvas'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import {Button, Grid} from '@material-ui/core'

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
function CreatePage({
  saveMoodboard,
  idOfUser,
  idOfMoodboard,
  match,
  moodboards,

  getMoodboard,
  createMoodboard,
  oneMoodboard,
  state
}) {
  const classes = useStyles()
  const [userCanvas, setUserCanvas] = useState({})

  const [board, setBoard] = useState('')

  useEffect(() => {
    async function fetchMoodboard() {
      await createMoodboard(idOfUser, '{}')
      setBoard(oneMoodboard)
      console.log('######oneMoodboard: ', oneMoodboard)
    }
    fetchMoodboard()
  }, [])

  console.log('board: ', board)
  const saveButtonClick = async (e, canvasObject) => {
    e.preventDefault()
    setUserCanvas(canvasObject)
    const canvasString = JSON.stringify(canvasObject)
    console.log(canvasString)
    try {
      await saveMoodboard(idOfUser, idOfMoodboard, canvasString)
    } catch (error) {
      console.error(error)
    }
  }
  console.log('state: ', state)

  const canvasDescription = oneMoodboard && oneMoodboard.description

  console.log('oneMoodboard: ', oneMoodboard)
  let moodKeys = Object.keys(oneMoodboard)
  let hasMoodboard = oneMoodboard && moodKeys.length
  console.log('hasmoodboard @@@@: ', hasMoodboard)
  console.log('oneMoodboard: ', typeof oneMoodboard)

  return (
    <Container maxWidth="xs">
      <Grid className={classes.titlesContainer}>
        <Typography component="h1" variant="h1">
          Unleash Your Creativity
        </Typography>

        <Typography component="h3" variant="h3">
          {canvasDescription}
        </Typography>
      </Grid>
      {hasMoodboard ? (
        <div>
          <CanvasBoard
            saveButtonClick={saveButtonClick}
            moodboardCanvas={oneMoodboard}
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
    idOfUser: state.user.id,
    moodboards: state.moodboards,
    oneMoodboard: state.singleMoodboard,
    idOfMoodboard: state.singleMoodboard.id,
    state: state
  }
}
const mapDispatch = dispatch => {
  return {
    saveMoodboard: (userId, moodboardId, fabricCanvas) => {
      dispatch(canvasSaver(userId, moodboardId, fabricCanvas))
    },
    getMoodboard: (userId, moodboardId) => {
      dispatch(fetchAMoodboard(userId, moodboardId))
    },
    createMoodboard: (userId, canvas) => {
      dispatch(createAMoodboard(userId, canvas))
    }
  }
}
export default connect(mapState, mapDispatch)(CreatePage)

/* import React, {useCallback, useState, useEffect} from 'react'
import {connect} from 'react-redux'
import CanvasBoard from './Canvas'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import {Button, Grid} from '@material-ui/core'
import { canvasSaver, createAMoodboard , fetchAMoodboard } from '../store'

const useStyles = makeStyles((theme) => ({
  titlesContainer: {
    marginTop: 70,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    marginTop: 50,
  },
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '80%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const CreatePage = ({createMoodboard, getMoodboard, saveMoodboard}) => {
  const classes = useStyles()
  const [board, setBoard] = useState('')
  let canvas = {}
  useEffect(() => {
    async function buildMoodboard() {
      console.log('INSIDE: ', userId)
      
      await createMoodboard(userId, canvas)

      await getMoodboard(userId, moodboardId)
      setBoard(oneMoodboard)
      console.log('######oneMoodboard: ', oneMoodboard)
    }
    buildMoodboard()
  }, [])
  return (
    <Container maxWidth="xs">
      <Grid className={classes.titlesContainer}>
        <Typography component="h1" variant="h1">
          Create Your Moodboard
        </Typography>
      </Grid>
    </Container>
  )
}

const mapDispatch = (dispatch) => {
    return {
      saveMoodboard: (userId, moodboardId, fabricCanvas) => {
        dispatch(canvasSaver(userId, moodboardId, fabricCanvas))
      },
      createMoodboard: (userId, canvas)=>{
          dispatch(createAMoodboard(userId, canvas))
      },
      getMoodboard: (userId, moodboardId) => {
        dispatch(fetchAMoodboard(userId, moodboardId))
      },
    }
  }
  export default connect(null, mapDispatch)(CreatePage)

 */
