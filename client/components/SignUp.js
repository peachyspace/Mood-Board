import React, {useState} from 'react'
import {connect} from 'react-redux'
import {signup} from '../store'
import {useHistory} from 'react-router-dom'
import SignUpForm from './SignUpForm'

const SignUp = ({signUpUser}) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [focused, setFocused] = useState(false)
  const history = useHistory()
  const onSignUpButtonClick = async e => {
    try {
      e.preventDefault()
      console.log('clicked!!!!!!!!!!!!!')
      await signUpUser(firstName, lastName, username, email, password)
      console.log('done!!!')
      history.push('/home')
      location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  const isRequried = val => {
    return val.length > 0 ? '' : 'cannot be blank'
  }
  const validate = validations => {
    //map over the validations
    //validations is an array of validators and those validators return error messeges
    setErrors(validations.map(errorsFor => errorsFor(firstName)))
  }

  return (
    <SignUpForm
      firstName={firstName}
      handleFirstNameChange={e => {
        setFirstName(e.target.value)
      }}
      lastName={lastName}
      handleLastNameChange={e => {
        setLastName(e.target.value)
      }}
      username={username}
      handleUsernameChange={e => {
        setUsername(e.target.value)
      }}
      email={email}
      handleEmailChange={e => {
        setEmail(e.target.value)
      }}
      password={password}
      handlePasswordChange={e => {
        setPassword(e.target.value)
      }}
      errors={errors}
      focused={focused}
      setFocusedTrue={() => setFocused(true)}
      onSignUpButtonClick={onSignUpButtonClick}
      isRequried={val => isRequried(val)}
      validate={validation => {
        validate(validation)
      }}
    />
  )
}

const mapDispatch = dispatch => {
  return {
    signUpUser: (firstName, lastName, username, email, password) => {
      dispatch(signup(firstName, lastName, username, email, password))
    }
  }
}

export default connect(null, mapDispatch)(SignUp)
