import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import whiteBrick from '../../public/images/whiteBrick.png'
import logo from '../../public/images/logo.png'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import respect from '../../public/images/respect.png'
import hello from '../../public/images/hello.png'
import fallInspiration from '../../public/images/fallInspiration.png'
import journey from '../../public/images/journey.png'
import roadTrip from '../../public/images/roadTrip.png'
import twoRoads from '../../public/images/twoRoads.png'
import beigePaper from '../../public/images/beigePaper.png'
import possible from '../../public/images/possible.png'
import playfulPups from '../../public/images/playfulPups.png'
import summer from '../../public/images/summer.png'
import logoNote from '../../public/images/logoNote.png'
import notebook from '../../public/images/notebook.png'
import paintNote from '../../public/images/paintNote.png'
import Footer from './Footer'

const useStyles = makeStyles(theme => ({
  container: {
    minWidth: 500,
    backgroundImage: `url(${whiteBrick})`,
    height: '80em',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-reapeat'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  gridList: {
    width: 1100,
    height: 360
  },
  subTitle: {
    textDecoration: 'none',
    fontFamily: 'Josefin Slab',
    fontWeight: 400,
    fontSize: '1.35em',
    letterSpacing: 2,
    color: 'black'
  }
}))
const Landing = () => {
  const classes = useStyles()
  const tileData = [
    {title: 'Respect', img: respect},
    {title: 'Hello', img: hello},
    {title: 'Fall Inspiration', img: fallInspiration},
    {title: 'Jorney', img: journey},
    {title: 'Road Trip', img: roadTrip},
    {title: 'Roads', img: twoRoads},
    {title: 'Summer', img: summer},
    {title: 'Possible', img: possible},
    {title: 'Playful Pups', img: playfulPups}
  ]

  return (
    <Grid
      container
      alignContent="center"
      direction="column"
      className={classes.container}
    >
      <Grid
        item
        container
        justify="center"
        alignContent="center"
        style={{
          marginTop: '15em',
          backgroundImage: `url(${beigePaper})`,
          height: '65em',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-reapeat'
        }}
      >
        <Grid
          item
          container
          direction="row"
          justify="center"
          style={{marginTop: '-13em'}}
        >
          <img src={logo} alt="logo" style={{width: '9em', height: '9em'}} />
          <Typography component="h1" variant="h1" style={{marginTop: '1em'}}>
            Moodboard
          </Typography>
        </Grid>
        <Grid item container justify="center" alignContent="center">
          <Typography
            component="h4"
            variant="h4"
            style={{
              marginTop: '-2em',
              marginBottom: '1em'
            }}
          >
            Our Users Creations:
          </Typography>
          <Grid
            item
            container
            alignContent="center"
            justify="center"
            style={{
              marginTop: '1em'
            }}
          >
            <div className={classes.root}>
              <GridList cellHeight={180} className={classes.gridList} cols={3}>
                {tileData.map(tile => (
                  <GridListTile
                    key={tile.title}
                    style={{width: 360, height: 360}}
                  >
                    <img src={tile.img} />
                  </GridListTile>
                ))}
              </GridList>
            </div>
          </Grid>
          <Grid
            container
            justify="center"
            style={{
              marginTop: '2em'
            }}
          >
            <img
              src={logoNote}
              alt="logoNote"
              style={{width: '20em', height: '25em'}}
            />
            <img
              src={notebook}
              alt="openBook"
              style={{width: '40em', height: '25em'}}
            />
            <img
              src={paintNote}
              alt="paintNote"
              style={{width: '20em', height: '25em'}}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          justify="center"
          style={{
            textAlign: 'center',
            marginTop: '6em'
          }}
        >
          <Footer />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Landing
