import React, {useState} from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import {Button, Grid} from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import {ChromePicker} from 'react-color'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '80%',
    marginTop: theme.spacing(1)
  },
  formContainer: {
    marginTop: 20
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  failedSubmit: {
    color: 'red'
  },
  button: {
    color: 'black',
    backgroundColor: '#e8dfd7'
  }
}))

const BackgroundSection = ({
  canvas,
  create,
  setCreateBackgroundColor,
  createBackgroundColor,
  canvasBC
}) => {
  const classes = useStyles()
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState(
    JSON.parse(!create ? canvasBC : `{}`)
  )

  const handleColorClick = e => {
    e.preventDefault()
    setDisplayColorPicker(!displayColorPicker)
  }
  const handleClose = e => {
    e.preventDefault()
    setDisplayColorPicker(false)
  }

  const handleColorChange = data => {
    //allows cursor in color picker to move
    if (data.hsl !== backgroundColor) {
      let rgba = `rgba(${data.rgb.r}, ${data.rgb.g}, ${data.rgb.b}, ${
        data.rgb.a
      })`
      canvas.backgroundColor = rgba
      canvas.renderAll()
      console.log('data.rgb: ', data.rgb)
      if (create) {
        setCreateBackgroundColor(data.rgb)
      } else {
        setBackgroundColor(data.rgb)
      }
      //setBackgroundColor(data.rgb)
    }
  }
  const popover = {
    position: 'absolute',
    zIndex: '2'
  }
  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px'
  }

  return (
    <Grid container /* justify = 'center' */>
      <Grid item>
        <Button
          className={classes.button}
          varaint="contained"
          onClick={e => handleColorClick(e)}
        >
          {' '}
          <Typography component="h6" variant="h6">
            Background Color
          </Typography>
        </Button>
        {displayColorPicker ? (
          <div style={popover}>
            <div style={cover} onClick={e => handleClose(e)} />
            <ChromePicker
              color={create ? createBackgroundColor : backgroundColor}
              onChange={handleColorChange}
            />
          </div>
        ) : null}
      </Grid>
    </Grid>
  )
}
export default BackgroundSection
