import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import {Button, Grid} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  titlesContainer: {
    marginTop: 70,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

function DisplayMoodboardInfo({
  titleOfCanvas,
  headerTitle,
  descriptionOfCanvas,
  headerDescription
}) {
  const classes = useStyles()
  const [showAll, setShowAll] = useState(false)

  const showMore = () => {
    setShowAll(true)
  }
  const showLess = () => {
    setShowAll(false)
  }

  const display = () => {
    let testText = 'moodboard description'
    if (showAll) {
      return (
        <Typography component="h5" variant="h5">
          {headerDescription.length === 0
            ? descriptionOfCanvas
            : headerDescription}{' '}
        </Typography>
      )
    } else {
      return (
        <Typography component="h5" variant="h5">
          {headerDescription.length === 0
            ? descriptionOfCanvas
              ? `${descriptionOfCanvas.substring(0, 20)}....`
              : testText.substring(0, 20)
            : `${headerDescription.substring(0, 20)}....`}
        </Typography>
      )
    }
  }

  return (
    <Grid className={classes.titlesContainer}>
      <Typography component="h3" variant="h3">
        {headerTitle.length === 0 ? titleOfCanvas : headerTitle}
      </Typography>
      {display()}
      {showAll ? (
        <div>
          <Button onClick={showLess}>
            <Typography component="h6" variany="h6">
              show less
            </Typography>
          </Button>
        </div>
      ) : (
        <div>
          <Button onClick={showMore}>
            <Typography component="h6" variant="h6">
              show more
            </Typography>
          </Button>
        </div>
      )}
    </Grid>
  )
}

export default DisplayMoodboardInfo
