import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import {logout} from '../store'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Button from '@material-ui/core/Button'

const styles = theme => ({
  navbar: {
    backgroundColor: theme.palette.common.colorWhite,
    maxWidth: '100%',
    minWidth: 1450,
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  tabsCont: {
    marginLeft: '9em'
  },
  tab: {
    ...theme.typography.tab
  },
  tabs2: {
    ...theme.typography.tab
  },

  signOutButton: {
    textTransform: 'none',
    fontFamily: 'Lato',
    backgroundColor: theme.palette.common.colorTwo,
    height: '2em',
    alignSelf: 'center',
    marginRight: '1em'
  }
})

const Navbar = ({handleLogOut, isLoggedIn}) => {
  const [value, setValue] = useState(0)
  console.log('isLoggedIn: ', isLoggedIn)
  const history = useHistory()
  useEffect(() => {
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

  return (
    <React.Fragment>
      <AppBar>
        {isLoggedIn ? (
          <Toolbar className={styles.navbar}>
            {/*  Navbar will render these links after a user logs in */}
            <Tabs
              className={styles.tabsCont}
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="secondary"
            >
              <Tab
                className={styles.tab}
                component={Link}
                to="/"
                label="Main"
              />
              <Tab
                className={styles.tab}
                component={Link}
                to="/create"
                label="Create"
              />
              <Tab
                className={styles.tab}
                component={Link}
                to="/home"
                label="Home"
              />
            </Tabs>
            <Button
              component="a"
              onClick={e => handleSignOutButton(e)}
              style={{marginLeft: 'auto'}}
              classes={{root: styles.signOutButton}}
            >
              Sign Out
            </Button>
          </Toolbar>
        ) : (
          <Toolbar>
            <Tabs
              className={styles.tabsCont}
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="secondary"
            >
              {/* Renders before users logs in */}
              <Tab
                className={styles.tab}
                component={Link}
                to="/"
                label="Main"
              />

              <Tab
                component={Link}
                to="/login"
                label="Login"
                className={styles.tabs2}
                style={{marginLeft: '55em'}}
              />
              <Tab
                component={Link}
                to="/signup"
                label="Sign Up"
                className={styles.tabs2}
                style={{marginLeft: '55em'}}
              />
            </Tabs>
          </Toolbar>
        )}
      </AppBar>
    </React.Fragment>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleLogOut() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}
