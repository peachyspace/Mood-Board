import React, {useState} from 'react'
import {connect} from 'react-redux'
import {login} from '../store/user'
import {useHistory} from 'react-router-dom'
import LoginForm from './LoginForm'

const Login = ({loginUser, user, error}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  console.log('user:', user)
  console.log('email: ', email)
  console.log('password: ', password)

  const [loginMsg, setLoginMsg] = useState('')
  const history = useHistory()
  const onSubButtonClick = async e => {
    if (email !== '' && password !== '') {
      try {
        e.preventDefault()
        console.log(email, password)
        await loginUser(email, password)

        console.log('user:', user)
        console.log('error Messege:', error)
      } catch (error) {
        console.log(error)
      }
      try {
        console.log(typeof error === 'undefined')
        console.log('outside')
        console.log('error Messege:', error)

        if (typeof error === 'undefined') {
          e.persist()
          console.log('inside')
          console.log('error Messege:', error)
        } else {
          history.push('/home')
          location.reload()
        }
      } catch (error) {
        console.log(error)
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
      /* onEmailChange={(e) => setEmail(e.target.value)} */
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
    user: state.user,
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
