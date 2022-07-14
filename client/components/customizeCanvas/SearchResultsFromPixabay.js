import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import AddCircleIcon from '@material-ui/icons/AddCircle'

import pixabayLogo from '../../../public/images/pixabayLogo.png'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: '100%',
    height: 450
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  }
}))

const SearchResultsFromPixabay = ({results}) => {
  const classes = useStyles()

  return (
    <div className={classes.root} style={{marginTop: '1.5em'}}>
      <GridList cellHeight={180} className={classes.gridList} cols={5}>
        <GridListTile key="Subheader" cols={5} style={{height: 'auto'}}>
          <ListSubheader
            component="div"
            style={{
              backgroundColor: '#C3A789',
              textAlign: 'center',
              fontWeight: 700,
              fontSize: '17px'
            }}
          >
            <a href="https://pixabay.com/" target="_blank" rel="noreferrer">
              Search Results From Pixabay{' '}
              <img
                src={pixabayLogo}
                alt="Pixabay logo"
                style={{width: 23, height: 23, marginTop: '8px'}}
              />{' '}
            </a>
          </ListSubheader>
        </GridListTile>
        {results.map(result => (
          <GridListTile key={result.id}>
            <img src={result.previewURL} />
            <GridListTileBar
              subtitle={
                <a
                  href={`https://pixabay.com/users/${result.user}-${
                    result.user_id
                  }/`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {result.user} on Pixabay
                </a>
              }
              actionIcon={
                <IconButton
                  aria-label={`info about ${result.id}`}
                  className={classes.icon}
                  href={result.pageURL}
                  target="_blank"
                  rel="noreferrer"
                >
                  <AddCircleIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}

export default SearchResultsFromPixabay
