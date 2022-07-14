import React from 'react'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'

const TextForm = ({text, handleTextChange, errors, setErrors, validations}) => {
  const validate = (validationsArray, value, string) => {
    //map over the validationsArray
    //validationsArray is an array of validators and those validators return error messeges

    //'...errors' spreads the entries from the oject named errors in TextSection.js
    setErrors(() => ({
      ...errors,
      //updating [text]
      [string]: validationsArray
        .map(validationFunc => validationFunc(value))
        .filter(errorMsg => errorMsg.length > 0)
    }))
  }
  return (
    <Container>
      <TextField
        id="text"
        placeholder="Type text here"
        name="text"
        multiline={true}
        value={text}
        onChange={e => handleTextChange(e)}
        required={true}
        onBlur={() => validate(validations, text, 'text')}
        helperText={errors.text.length === 0 ? null : errors.text.join(',')}
      />
    </Container>
  )
}
export default TextForm
