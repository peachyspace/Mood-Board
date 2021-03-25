import React, {useCallback, useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {createAMoodboard} from '../store'
import CanvasBoard from './Canvas'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import {Button, Grid} from '@material-ui/core'
import MoodboardForm from './MoodboardForm'
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  titlesContainer: {
    marginTop: 70,
    display: 'flex',
    flexDirection: 'column',
    //alignItems: 'center',
    justify: 'center'
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
  formContainer: {
    marginTop: 20
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
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

function CreatePage({idOfUser, createMoodboard, state}) {
  const classes = useStyles()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState(intialErrors)
  const [submitMsg, setSubmitMsg] = useState('')
  const [userCanvas, setUserCanvas] = useState({})
  const [format, setFormat] = useState('Regular Canvas Size')
  const [createHeight, setCreateHeight] = useState(800)
  const [createWidth, setCreateWidth] = useState(800)

  const [board, setBoard] = useState('')
  const history = useHistory()
  useEffect(() => {
    async function fetchMoodboard() {
      /* await createMoodboard(idOfUser, '{}')
      setBoard(oneMoodboard) */
      console.log('NOTHING: ')
    }
    fetchMoodboard()
  }, [])

  const createMoodboardButton = async e => {
    if (title.length !== 0 && description.length !== 0) {
      try {
        e.preventDefault()
        const canvasString = JSON.stringify(
          userCanvas.toObject(['height', 'width'])
        )
        console.log(title, description)
        await createMoodboard(
          idOfUser,
          title,
          description,
          canvasString,
          format,
          createHeight,
          createWidth
        )
        history.push('/home')
        location.reload()
      } catch (error) {
        console.error(error)
      }
    } else {
      e.preventDefault()
      setSubmitMsg('Submission Failed')
    }
  }
  //console.log('state: ', state)

  return (
    <Container maxWidth="xs" justify="center">
      <Grid container>
        <Grid item container className={classes.container} justify="center">
          <Grid
            item
            container
            className={classes.container}
            justify="center"
            style={{marginTop: '1em', marginLeft: '6em'}}
          >
            <Typography component="h1" variant="h1">
              Unleash Your Creativity
            </Typography>
          </Grid>
          <div>
            <Grid
              item
              container
              className={classes.container}
              justify="center"
              style={{marginTop: '1em', marginLeft: '6em'}}
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

            <CanvasBoard
              createMoodboardButton={createMoodboardButton}
              create="create"
              setUserCanvas={setUserCanvas}
              userCanvas={userCanvas}
              setFormat={setFormat}
              createFormat={format}
              setCreateHeight={setCreateHeight}
              setCreateWidth={setCreateWidth}
            />
            <Grid container>
              <Grid
                item
                container
                alignItems="center"
                style={{marginTop: '1em', marginLeft: '6em'}}
              >
                {submitMsg === '' ? null : (
                  <Typography className={classes.failedSubmit}>
                    {submitMsg}
                  </Typography>
                )}
                <Button
                  type="submit"
                  fullWidth={false}
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={e => createMoodboardButton(e)}
                >
                  <Typography component="h6" variant="h6">
                    Create Moodboard
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Container>
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
      width
    ) => {
      dispatch(
        createAMoodboard(
          userId,
          title,
          description,
          canvas,
          format,
          height,
          width
        )
      )
    }
  }
}
export default connect(mapState, mapDispatch)(CreatePage)
