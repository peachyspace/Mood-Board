import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import {Button, Grid} from '@material-ui/core'
import MoodboardForm from './MoodboardForm'

const useStyles = makeStyles(theme => ({
  titlesContainer: {
    marginTop: 5,
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
  },
  button: {
    color: 'black',
    backgroundColor: '#e8dfd7'
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
  title,
  setTitle,
  description,
  setDescription
}) {
  const classes = useStyles()

  const [errors, setErrors] = useState(intialErrors)
  const [displayForm, setDisplayForm] = useState(false)

  const handleFormClick = e => {
    e.preventDefault()
    setDisplayForm(!displayForm)
  }

  const handleFormClose = e => {
    e.preventDefault()
    setDisplayForm(false)
  }

  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px'
  }

  return (
    <Container maxWidth="xs">
      <Grid className={classes.titlesContainer}>
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
                <Button
                  className={classes.button}
                  onClick={e => handleFormClick(e)}
                >
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

export default UpdateTitleAndDescription
