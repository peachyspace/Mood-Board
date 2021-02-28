import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  toolbar: {
    paddingTop: '1em',
    paddingBottom: '1em'
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '4em'
  },
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
  cartButtonImg: {
    width: '4em'
  },
  menu: {
    ...theme.typography.tab,
    backgroundColor: theme.palette.common.colorThree
  },

  menuItem: {
    fontSize: '0.7em'
  },
  signOutButt: {
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
  useEffect(
    () => {
      if (isLoggedIn) {
        console.log('logged in')
      }
    },
    [isLoggedIn]
  )
  return (
    <React.Fragment>
      <AppBar>
        {isLoggedIn ? (
          <Toolbar className={styles.tabsCont} indicatorColor="primary">
            {/* The navbar will show these links after you log in */}
            <Tabs
              className={styles.tabsCont}
              value={value}
              indicatorColor="primary"
            >
              <Tab
                className={styles.tab}
                component={Link}
                to="/"
                label="Home"
              />

              <Tab
                className={styles.tab}
                component={Link}
                to="/create"
                label="Create"
              />
              <Button
                component="a"
                onClick={handleLogOut()}
                style={{marginLeft: '55em'}}
                classes={{root: styles.signOutButt}}
              >
                Sign Out
              </Button>
            </Tabs>
          </Toolbar>
        ) : (
          <Toolbar>
            <Tabs
              className={styles.tabsCont}
              value={value}
              indicatorColor="primary"
            >
              {/* The navbar will show these links before you log in */}
              <Tab
                className={styles.tab}
                component={Link}
                to="/"
                label="Home"
              />
              <Tab
                className={styles.tab}
                component={Link}
                to="/create"
                label="Create"
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
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
