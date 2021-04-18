import React, {useState} from 'react'
import {connect} from 'react-redux'
import {signup} from '../store'
import {useHistory} from 'react-router-dom'
import SignUpForm from './SignUpForm'

const isRequried = val => {
  return val.length > 0 ? '' : 'cannot be blank'
}
const isEmail = val => {
  const atIndex = val.indexOf('@')
  //if current integer is a dot then retun the current index otherwise we will retun the accumulator
  //acc value of starting accumulator
  const greatestDotIndex = val
    .split('')
    .reduce((acc, char, index) => (char === '.' ? index : acc), 0)
  return atIndex > -1 && greatestDotIndex > atIndex ? '' : 'must be an email'
}
const intialErrors = {
  firstName: [],
  lastName: [],
  username: [],
  email: [],
  password: []
}

const SignUp = ({signUpUser}) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState(intialErrors)
  const [submitMsg, setSubmitMsg] = useState('')
  const history = useHistory()

  const onSignUpButtonClick = async e => {
    if (
      firstName.length !== 0 &&
      lastName.length !== 0 &&
      username.length !== 0 &&
      email.length !== 0 &&
      errors.email.length === 0 &&
      password.length !== 0
    ) {
      try {
        e.preventDefault()
        await signUpUser(firstName, lastName, username, email, password)
        history.push('/home')
        location.reload()
      } catch (error) {
        console.log(error)
      }
    } else {
      e.preventDefault()
      setSubmitMsg('Submission Failed')
    }
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
      setErrors={setErrors}
      onSignUpButtonClick={onSignUpButtonClick}
      validations={[isRequried]}
      emailValidation={[isRequried, isEmail]}
      submitMsg={submitMsg}
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
