import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import {Button, Grid, Select} from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
const Zoom = ({zoomValue, setZoomValue, format}) => {
  // const [zoomValue, setZoomValue] = useState(25)
  const dontApply = {
    'Spotify Playlist Cover': true,
    'Regular Canvas Size': true,
    'iPhone 6/6s/7/8 ': true,
    'iPhone SE (2020)': true,
    'Samsung Galaxy S7': true
  }
  const biggestSizes = {
    'Instagram Potrait Size': true,
    'Facebook Potrait Size': true
  }
  const handleZoomChange = e => {
    setZoomValue(e.target.value)
    document.getElementById('canvasHolder').style.transform = `scale(${e.target
      .value / 100})`
    if (!(format in dontApply) && e.target.value === 25) {
      if (!(format in biggestSizes)) {
        document.getElementById('canvasHolder').style.marginTop = '-16em'
        document.getElementById('canvasHolder').style.marginBottom = '-18em'
      } else {
        document.getElementById('canvasHolder').style.marginTop = '-27em'
        document.getElementById('canvasHolder').style.marginBottom = '-27em'
      }
    } else if (!(format in dontApply) && e.target.value === 50) {
      if (!(format in biggestSizes)) {
        document.getElementById('canvasHolder').style.marginTop = '-11em'
        document.getElementById('canvasHolder').style.marginBottom = '-11em'
      } else {
        document.getElementById('canvasHolder').style.marginTop = '-17em'
        document.getElementById('canvasHolder').style.marginBottom = '-17em'
      }
    } else if (!(format in dontApply) && e.target.value === 75) {
      if (!(format in biggestSizes)) {
        document.getElementById('canvasHolder').style.marginTop = '-5em'
        document.getElementById('canvasHolder').style.marginBottom = '-7em'
      } else {
        document.getElementById('canvasHolder').style.marginTop = '-8em'
        document.getElementById('canvasHolder').style.marginBottom = '-8em'
      }
    } else if (!(format in dontApply) && e.target.value === 100) {
      document.getElementById('canvasHolder').style.marginTop = '0em'
      document.getElementById('canvasHolder').style.marginBottom = '0em'
    } else if (
      format !== 'Spotify Playlist Cover' &&
      format in dontApply &&
      e.target.value === 25
    ) {
      document.getElementById('canvasHolder').style.marginTop = '-13em'
      document.getElementById('canvasHolder').style.marginBottom = '-13em'
    } else if (
      format !== 'Spotify Playlist Cover' &&
      format in dontApply &&
      e.target.value === 50
    ) {
      document.getElementById('canvasHolder').style.marginTop = '-8em'
      document.getElementById('canvasHolder').style.marginBottom = '-10em'
    } else if (
      format !== 'Spotify Playlist Cover' &&
      format in dontApply &&
      e.target.value === 75
    ) {
      document.getElementById('canvasHolder').style.marginTop = '-4em'
      document.getElementById('canvasHolder').style.marginBottom = '-6em'
    } else {
      document.getElementById('canvasHolder').style.marginTop = '0em'
      document.getElementById('canvasHolder').style.marginBottom = '0em'
    }
  }

  return (
    <Grid
      container
      justify="center"
      style={{marginTop: '0.7em', marginBottom: '0.4em'}}
    >
      <Grid item>
        <Select value={zoomValue} onChange={handleZoomChange}>
          <MenuItem value={25}>
            <Typography component="h5" variant="h5">
              25%
            </Typography>
          </MenuItem>
          <MenuItem value={50}>
            <Typography component="h5" variant="h5">
              50%
            </Typography>
          </MenuItem>
          <MenuItem value={75}>
            <Typography component="h5" variant="h5">
              75%
            </Typography>
          </MenuItem>
          <MenuItem value={100}>
            <Typography component="h5" variant="h5">
              100%
            </Typography>
          </MenuItem>
        </Select>
      </Grid>
    </Grid>
  )
}
export default Zoom
