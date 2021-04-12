import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import AddIcon from '@material-ui/icons/Add'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import {connect} from 'react-redux'
import {fetchUnsplashPhoto} from '../../store'

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

const ResultsFromUnsplash = ({canvas, results, addToDownloadCount}) => {
  const classes = useStyles()

  const addUnsplashImage = async (url, photoId) => {
    try {
      await addToDownloadCount(photoId)
    } catch (error) {
      console.log(error)
    }
    fabric.Image.fromURL(url, function(oImg) {
      //scale image down, and flip it, before adding it onto canvas
      oImg.scale(0.5).setupState('flipxX', true)
      canvas.add(oImg)
    })
  }
  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList} cols={5}>
        <GridListTile key="Subheader" cols={5} style={{height: 'auto'}}>
          <ListSubheader component="div">
            Search Results From Unsplash
          </ListSubheader>
        </GridListTile>
        {results.map(result => (
          <GridListTile key={result.id}>
            <img
              src={result.urls.small}
              alt={result.alt_description}
              /* onClick={() => selectImage(result.urls.small)} */
            />
            <GridListTileBar
              title={result.alt_description}
              subtitle={<span>by: {result.user.name}</span>}
              actionIcon={
                <IconButton
                  aria-label={`info about ${result.alt_description}`}
                  className={classes.icon}
                  onClick={() =>
                    addUnsplashImage(result.urls.regular, result.id)
                  }
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

const mapDispatch = dispatch => {
  return {
    addToDownloadCount: photoId => {
      dispatch(fetchUnsplashPhoto(photoId))
    }
  }
}

export default connect(null, mapDispatch)(ResultsFromUnsplash)
