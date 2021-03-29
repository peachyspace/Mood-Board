import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 20
  },
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  form: {
    width: '80%',

    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  failedSubmit: {
    color: 'red'
  }
}))
const MoodboardForm = ({
  title,
  handleTitleChange,
  description,
  handleDescriptionChange,
  errors,
  setErrors,
  validations
}) => {
  const classes = useStyles()

  const validate = (validationsArray, value, string) => {
    //map over the validationsArray
    //validationsArray is an array of validators and those validators return error messeges

    setErrors(() => ({
      ...errors,
      [string]: validationsArray
        .map(validationFunc => validationFunc(value))
        .filter(errorMsg => errorMsg.length > 0)
    }))

    console.log('errors : ', errors)
  }
  // edit = edit=== undefined && false
  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <form className={classes.form}>
          <TextField
            error={errors.title.length !== 0}
            value={title}
            /* value={edit ?(title.length > 0 ? title : canvasTitle): title} */
            onChange={e => handleTitleChange(e)}
            required={true}
            margin="normal"
            fullWidth
            id="title"
            label="Title"
            name="title"
            onBlur={() => validate(validations, title, 'title')}
            helperText={
              errors.title.length === 0 ? null : errors.title.join(', ')
            }
          />
          <TextField
            error={errors.description.length !== 0}
            value={description}
            /*  value={edit ? (description.length > 0 ? description : canvasDescription) : description} */
            onChange={e => handleDescriptionChange(e)}
            margin="normal"
            required={true}
            fullWidth
            id="description"
            label="Description"
            name="description"
            onBlur={() => validate(validations, description, 'description')}
            helperText={
              errors.description.length === 0
                ? null
                : errors.description.join(', ')
            }
          />
        </form>
      </div>
    </Container>
  )
}
export default MoodboardForm

/* import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 20
  },
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  form: {
    width: '80%',

    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  failedSubmit: {
    color: 'red'
  }
}))
const MoodboardForm = ({
  title,
  handleTitleChange,
  description,
  handleDescriptionChange,
  errors,
  setErrors,
  validations
}) => {
  const classes = useStyles()

  const validate = (validationsArray, value, string) => {
    //map over the validationsArray
    //validationsArray is an array of validators and those validators return error messeges

    setErrors(() => ({
      ...errors,
      [string]: validationsArray
        .map(errorsFor => errorsFor(value))
        .filter(errorMsg => errorMsg.length > 0)
    }))

    console.log('errors : ', errors)
  }

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <form className={classes.form}>
          <TextField
            error={errors.title.length !== 0}
            value={title}
            onChange={e => handleTitleChange(e)}
            required={true}
            margin="normal"
            fullWidth
            id="title"
            label="Title"
            name="title"
            onBlur={() => validate(validations, title, 'title')}
            helperText={
              errors.title.length === 0 ? null : errors.title.join(', ')
            }
          />
          <TextField
            error={errors.description.length !== 0}
            value={description}
            onChange={e => handleDescriptionChange(e)}
            margin="normal"
            required={true}
            fullWidth
            id="description"
            label="Description"
            name="description"
            onBlur={() => validate(validations, description, 'description')}
            helperText={
              errors.description.length === 0
                ? null
                : errors.description.join(', ')
            }
          />
        </form>
      </div>
    </Container>
  )
}
export default MoodboardForm */
