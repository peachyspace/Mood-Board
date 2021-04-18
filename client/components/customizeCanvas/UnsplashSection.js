import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import {Grid} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import {connect} from 'react-redux'
import {fetchSearchResult} from '../../store'
import ResultsFromUnsplash from './ResultsFromUnsplash'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10,
    backgroundColor: '#e8dfd7'
  },
  divider: {
    height: 28,
    margin: 4
  },
  failedSubmit: {
    color: 'red'
  },
  button: {
    marginRight: 15,
    color: 'black',
    backgroundColor: '#e8dfd7'
  }
}))

const UnsplashSection = ({canvas, searchUnsplash, results}) => {
  const classes = useStyles()
  const [searchTerm, setSearchTerm] = useState('')
  const [messege, setMessege] = useState('Powered By Unsplash')

  const onType = e => {
    setSearchTerm(e.target.value)
  }

  const onSearchClick = async e => {
    e.preventDefault()
    console.log(searchTerm)
    try {
      await searchUnsplash(searchTerm)
      if (results.length === 0) {
        setMessege('No Results Found')
      } else {
        setMessege('Powered By Unsplash')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const hasSearchResults = results && results.length
  return (
    <Grid container justify="center">
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search Unsplash For Photos"
          inputProps={{'aria-label': 'search Unsplash photos'}}
          onChange={onType}
        />
        <IconButton
          color="primary"
          type="submit"
          className={classes.iconButton}
          onClick={onSearchClick}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>

      <Grid container justify="center">
        {hasSearchResults ? (
          <ResultsFromUnsplash results={results} canvas={canvas} />
        ) : (
          <Typography variant="h6">{messege}</Typography>
        )}
      </Grid>
    </Grid>
  )
}

const mapState = state => {
  return {
    results: state.searchUnsplash
  }
}

const mapDispatch = dispatch => {
  return {
    searchUnsplash: searchTerm => {
      dispatch(fetchSearchResult(searchTerm))
    }
  }
}

export default connect(mapState, mapDispatch)(UnsplashSection)
