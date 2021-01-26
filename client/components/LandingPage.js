import React from 'react'
import {withStyles} from '@material-ui/core/styles'

//import Footer from './Footer'

//import heroImg from '../../public/images/heroFlower.jpg'
//import featureSection from '../../public/images/featureSection.png'
import whiteBrick from '../../public/images/whiteBrick.png'
import moodboard1 from '../../public/images/moodboard1.png'
import brownBoard from '../../public/images/brownBoard.png'
import greyboard from '../../public/images/greyboard.png'
import blackboard from '../../public/images/blackboard.png'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  heroImg: {
    width: '20em', //20em
    height: '47em' //47em
  }
})

class Landing extends React.Component {
  render() {
    const {classes} = this.props

    return (
      <Grid container direction="column">
        <Grid container>
          <Typography variant="body2" paragraph>
            Release your creativity
          </Typography>
          <Grid
            item
            container
            style={{
              backgroundImage: `url(${whiteBrick})`,
              height: '80em',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-reapeat'
            }}
          >
            <Grid
              item
              container
              justify="center"
              alignContent="center"
              style={{marginBottom: '10em'}}
            >
              <Typography
                variant="h1"
                style={{marginTop: '1em', marginBottom: '1em'}}
              >
                Mood Board
              </Typography>
              <Typography
                variant="body2"
                style={{
                  marginTop: '10em',
                  marginBottom: '5em'
                  //marginRight: '1em',
                }}
              >
                Our Users Creations:
              </Typography>
            </Grid>
            <img
              src={moodboard1}
              alt="board1"
              style={{width: '25em', height: '25em'}}
            />
            <img
              src={brownBoard}
              alt="board2"
              style={{width: '25em', height: '25em'}}
            />
            <img
              src={greyboard}
              alt="board3"
              style={{width: '25em', height: '25em'}}
            />
            <img
              src={blackboard}
              alt="board4"
              style={{width: '25em', height: '25em'}}
            />
          </Grid>
        </Grid>
        {/* ------------------------------------------------------------  */}
      </Grid>
    )
  }
}

export default withStyles({styles, withTheme: true})(Landing)
