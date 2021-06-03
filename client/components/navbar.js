import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import {logout, me} from '../store'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Button from '@material-ui/core/Button'
import logo from '../../public/images/logo.png'
import {makeStyles} from '@material-ui/core/styles'
const useStyles = makeStyles(theme => ({
  navbar: {
    maxWidth: '100%',
    minWidth: 500
  },
  tabsCont: {
    marginLeft: '1em'
  },
  tab: {
    textDecoration: 'none',
    fontFamily: 'Josefin Slab',
    fontWeight: 400,
    fontSize: '1em',
    letterSpacing: 2,
    color: 'black',
    textAlign: 'center'
  },
  tabs2: {
    ...theme.typography.tab
  },

  signOutButton: {
    textDecoration: 'none',
    fontFamily: 'Josefin Slab',
    fontWeight: 400,
    fontSize: '1em',
    letterSpacing: 2,
    color: 'white',
    height: '2em',
    alignSelf: 'center'
  }
}))

const Navbar = ({handleLogOut, isLoggedIn, userId, moodboardId}) => {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const history = useHistory()
  useEffect(() => {
    async function getMe() {
      try {
        await me()
      } catch (error) {
        console.log(error)
      }
    }
    getMe()
    if (
      window.location.pathname === '/' &&
      value !== 0 &&
      isLoggedIn === false
    ) {
      setValue(0)
    } else if (
      window.location.pathname === '/login' &&
      value !== 1 &&
      isLoggedIn === false
    ) {
      setValue(1)
    } else if (
      window.location.pathname === '/' &&
      value !== 0 &&
      isLoggedIn === true
    ) {
      setValue(0)
    } else if (
      window.location.pathname === '/create' &&
      value !== 1 &&
      isLoggedIn === true
    ) {
      setValue(1)
    } else if (
      window.location.pathname === '/home' &&
      value !== 2 &&
      isLoggedIn === true
    ) {
      setValue(2)
    } else if (
      window.location.pathname === `/edit/${userId}/${moodboardId}` &&
      isLoggedIn === true
    ) {
      setValue(2)
    }
  })

  const handleSignOutButton = async e => {
    e.preventDefault()
    try {
      await handleLogOut()
      history.push('/login')
      location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  console.log('isLoggedIn: ', isLoggedIn)
  console.log('userId: ', userId)
  console.log('value: ', value)
  console.log('window.location.pathname: ', window.location.pathname)

  return (
    <React.Fragment>
      <AppBar>
        {isLoggedIn ? (
          <Toolbar className={classes.navbar}>
            {/*  Navbar will render these links after a user logs in */}
            <img src={logo} alt="logo" style={{width: '3em', height: '3em'}} />
            <Tabs
              className={classes.tabsCont}
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="secondary"
            >
              <Tab
                className={classes.tab}
                component={Link}
                to="/"
                label="Main"
              />
              <Tab
                className={classes.tab}
                component={Link}
                to="/create"
                label="Create"
              />
              <Tab
                className={classes.tab}
                component={Link}
                to="/home"
                label="Home"
              />
            </Tabs>
            <Button
              component="a"
              onClick={handleSignOutButton}
              /* onClick={e => handleSignOutButton(e)} */
              style={{marginLeft: 'auto'}}
              className={classes.signOutButton}
            >
              Sign Out
            </Button>
          </Toolbar>
        ) : (
          <Toolbar>
            <Tabs
              className={classes.tabsCont}
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="secondary"
            >
              {/* Renders before users logs in */}
              <Tab
                className={classes.tab}
                component={Link}
                to="/"
                label="Main"
              />

              <Tab
                component={Link}
                to="/login"
                label="Login"
                className={classes.tabs2}
                style={{marginLeft: '55em'}}
              />
              <Tab
                component={Link}
                to="/signup"
                label="Sign Up"
                className={classes.tabs2}
                style={{marginLeft: '55em'}}
              />
            </Tabs>
          </Toolbar>
        )}
      </AppBar>
    </React.Fragment>
  )
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    moodboardId: state.singleMoodboard.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleLogOut() {
      dispatch(logout())
    },
    me: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}
