import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {createAMoodboard} from '../store'
import CanvasBoard from './Canvas'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import {Button, Grid} from '@material-ui/core'
import MoodboardForm from './MoodboardForm'
import {useHistory} from 'react-router-dom'
/* import FontSection from './customizeCanvas/FontSection'
import BackgroundSection from './customizeCanvas/BackgroundSection'
import SizeSection from './customizeCanvas/SizeSection'
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from '@material-ui/core/Box'; */
import CreateCustomTab from './CreateCustomTab'

const useStyles = makeStyles(theme => ({
  titlesContainer: {
    marginTop: 70,
    display: 'flex',
    flexDirection: 'column',
    //alignItems: 'center',
    justify: 'center'
  },
  container: {
    marginTop: 70,
    alignItems: 'center'
  },
  paper: {
    /* marginTop: theme.spacing(10), */
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
  },

  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.common.colorFive
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
  //const theme = useTheme()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState(intialErrors)
  const [submitMsg, setSubmitMsg] = useState('')
  const [userCanvas, setUserCanvas] = useState({})
  const [format, setFormat] = useState('Regular Canvas Size')
  const [createHeight, setCreateHeight] = useState(800)
  const [createWidth, setCreateWidth] = useState(800)
  const [createBackgroundColor, setCreateBackgroundColor] = useState({
    r: 250,
    g: 0,
    b: 0.2,
    a: 1
  })
  /*   const [tabValue, setTabValue]= useState(0)
  const [displayValue, setDisplayValue]= useState(0) */

  //const [board, setBoard] = useState('')
  const history = useHistory()
  useEffect(() => {
    async function fetchMoodboard() {
      /* await createMoodboard(idOfUser, '{}')
      setBoard(oneMoodboard) */
      console.log('NOTHING: ')
    }
    fetchMoodboard()
  }, [])

  console.log(userCanvas)

  const createMoodboardButton = async e => {
    if (title.length !== 0 && description.length !== 0) {
      try {
        e.preventDefault()
        const canvasString = JSON.stringify(
          userCanvas.toObject(['height', 'width'])
        )
        console.log(title, description)
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

  const getTitle = () => {
    let createTilte
    if (title === '') {
      createTilte = 'untitled'
    } else {
      createTilte = title
    }
    return createTilte
  }

  /*  const handleTabChange = (event, value)=>{
      setTabValue(value)
      setDisplayValue(value)
  } */

  //let canvasKeys = Object.keys(userCanvas)
  //let hasCanvas = userCanvas && canvasKeys.length
  return (
    <Container maxWidth="xs" justify="center">
      {/* <Grid container>
        <Grid item container className={classes.container} justify="center"> */}
      <Grid
        item
        container
        className={classes.container}
        justify="center"
        style={{marginTop: '6em'}}
      >
        <Typography component="h1" variant="h1">
          Unleash your Creativity
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
        {/*  <Container> */}
        <div>
          <CreateCustomTab
            userCanvas={userCanvas}
            setCreateBackgroundColor={setCreateBackgroundColor}
            createBackgroundColor={createBackgroundColor}
            setFormat={setFormat}
            format={format}
            setCreateHeight={setCreateHeight}
            setCreateWidth={setCreateWidth}
          />
        </div>

        <Grid>
          <CanvasBoard
            createMoodboardButton={createMoodboardButton}
            create="create"
            setUserCanvas={setUserCanvas}
            userCanvas={userCanvas}
            setFormat={setFormat}
            createFormat={format}
            createHeight={createHeight}
            createWidth={createWidth}
            setCreateHeight={setCreateHeight}
            setCreateWidth={setCreateWidth}
            getTitle={getTitle}
            setCreateBackgroundColor={setCreateBackgroundColor}
            createBackgroundColor={createBackgroundColor}
          />
        </Grid>

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
        {/*   </Container> */}
      </div>
      {/*    </Grid>
      </Grid> */}
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
