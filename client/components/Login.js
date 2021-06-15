import React, {useState} from 'react'
import {connect} from 'react-redux'
import {login} from '../store/user'
import LoginForm from './LoginForm'

function Login({loginUser, error}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginMsg, setLoginMsg] = useState('')

  const onSubButtonClick = async e => {
    if (email !== '' && password !== '') {
      try {
        e.preventDefault()
        await loginUser(email, password)
      } catch (err) {
        console.error(err)
      }
    } else {
      e.preventDefault()
      setLoginMsg('Login Failed')
    }
  }

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }
  return (
    <LoginForm
      email={email}
      password={password}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={e => setPassword(e.target.value)}
      onSubClick={onSubButtonClick}
      loginMsg={loginMsg}
      error={error}
    />
  )
}
const mapState = state => {
  return {
    error: state.user.error
  }
}
const mapDispatch = dispatch => {
  return {
    loginUser: (email, password) => {
      dispatch(login(email, password))
    }
  }
}

export default connect(mapState, mapDispatch)(Login)
