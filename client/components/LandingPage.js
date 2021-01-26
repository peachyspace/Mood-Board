import React from 'react'
import {withStyles} from '@material-ui/core/styles'

//import Footer from './Footer'

//import heroImg from '../../public/images/heroFlower.jpg'
//import featureSection from '../../public/images/featureSection.png'
//import whiteBrick from '../../public/images/whiteBrick.png'
import moodboard1 from '../../public/images/moodboard1.png'
//import potion2 from '../../public/images/potion2.png'
//import potion3 from '../../public/images/potion3.png'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  heroImg: {
    width: '20em',
    height: '47em'
  }
})

class Landing extends React.Component {
  render() {
    const {classes} = this.props

    return (
      <Grid container direction="column">
        <Typography variant="body2" paragraph>
          Release your creativity
        </Typography>
        <Grid item container direction="row">
          <Grid item lg={3}>
            <img
              src={moodboard1}
              alt="flower"
              className={classes.heroImg}
              style={{width: '20em'}}
            />
          </Grid>
        </Grid>
        {/* ------------------------------------------------------------ featured section */}

        {/*  <Footer /> */}
      </Grid>
    )
  }
}

export default withStyles({styles, withTheme: true})(Landing)
