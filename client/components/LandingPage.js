import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import whiteBrick from '../../public/images/whiteBrick.png'
import moodboard1 from '../../public/images/moodboard1.png'
import brownBoard from '../../public/images/brownBoard.png'
import logo from '../../public/images/logo.png'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

class Landing extends React.Component {
  render() {
    const {classes} = this.props

    return (
      <Grid container direction="column">
        <Grid container>
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
              style={{marginBottom: '2em'}}
            >
              <Grid container direction="row" justify="center">
                <img
                  src={logo}
                  alt="logo"
                  style={{width: '10em', height: '10em'}}
                />
                <Typography variant="h1" style={{marginBottom: '1em'}}>
                  Moodboard
                </Typography>
              </Grid>
              <Grid
                item
                container
                justify="center"
                //alignContent="center"
                style={{marginBottom: '2em'}}
              >
                <Typography
                  variant="body2"
                  style={{
                    marginTop: '3em',
                    marginBottom: '1em'
                    //marginRight: '1em',
                  }}
                >
                  Our Users Creations:
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction="row">
              <Grid item container>
                <Grid
                  item
                  container
                  justify="center"
                  // alignContent="center"
                  style={{marginBottom: '2em'}}
                >
                  <img
                    src={moodboard1}
                    alt="board1"
                    style={{width: '20em', height: '20em'}}
                  />
                </Grid>
                <Grid
                  item
                  container
                  justify="center"
                  //alignContent="center"
                  style={{marginBottom: '2em'}}
                >
                  <img
                    src={brownBoard}
                    alt="board2"
                    style={{width: '20em', height: '20em'}}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles({styles, withTheme: true})(Landing)
