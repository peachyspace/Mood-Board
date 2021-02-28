import React, {useState} from 'react'
import {connect} from 'react-redux'
import {login} from '../store/user'

import LoginForm from './LoginForm'

const Login = ({loginUser, user}) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  console.log('email: ', email)
  console.log('password: ', password)
  console.log('user:', user)
  const onSubButtonClick = async e => {
    try {
      e.preventDefault()
      console.log(email, password)
      await loginUser(email, password)
      history.push('/home')
      location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }
  return (
    <LoginForm
      email={email}
      password={password}
      /* onEmailChange={(e) => setEmail(e.target.value)} */
      handleEmailChange={handleEmailChange}
      handlePasswordChange={e => setPassword(e.target.value)}
      onSubClick={onSubButtonClick}
    />
  )
}
const mapState = state => {
  return {user: state.user, error: state.user.error}
}
const mapDispatch = dispatch => {
  return {
    loginUser: (email, password) => {
      dispatch(login(email, password))
    }
  }
}

export default connect(mapState, mapDispatch)(Login)
