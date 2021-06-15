import React from 'react'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  paper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  form: {
    width: '80%'
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
export default MoodboardForm
