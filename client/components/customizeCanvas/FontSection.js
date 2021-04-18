import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import {Button, Grid} from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import {ChromePicker} from 'react-color'

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: 15,
    color: 'black',
    backgroundColor: '#e8dfd7'
  }
}))

const FontSection = ({canvas}) => {
  const classes = useStyles()

  const fonts = [
    'Josefin Slab',
    'Mali',
    'Aclonica',
    'Cutive Mono',
    'La Belle Aurore',
    'Gravitas One',
    'Fascinate',
    'Waiting for the Sunrise',
    'Pacifico',
    'Jacques Francois',
    'Lovers Quarrel',
    'Hachi Maru Pop',
    'Emilys Candy',
    'Special Elite'
  ]

  const [fontSelected, setFontSelected] = useState('Josefin Slab')
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [fontColor, setFontColor] = useState({})

  const handleColorClick = e => {
    e.preventDefault()
    setDisplayColorPicker(!displayColorPicker)
  }
  const handleClose = e => {
    e.preventDefault()
    setDisplayColorPicker(false)
  }

  const addTextbox = () => {
    let textbox = new fabric.Textbox('', {
      left: 50,
      top: 50,
      width: 150,
      fontSize: 20,
      fontFamily: 'Josefin Slab'
    })
    console.log(canvas)
    canvas.add(textbox).setActiveObject(textbox)
  }
  const changeFont = e => {
    let activeObject = canvas.getActiveObject()
    if (activeObject && activeObject.text) {
      activeObject.fontFamily = e.target.value
      setFontSelected(e.target.value)
      canvas.renderAll()
    }
  }

  const handleColorChange = data => {
    //allows cursor in color picker to move
    if (data.hsl !== fontColor) {
      let rgba = `rgba(${data.rgb.r}, ${data.rgb.g}, ${data.rgb.b}, ${
        data.rgb.a
      })`
      let activeObject = canvas.getActiveObject()
      if (activeObject && activeObject.text) {
        activeObject.set('fill', rgba)
        canvas.requestRenderAll()
        setFontColor(data.rgb)
      }
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
    <Grid container>
      <Grid item>
        <Button
          className={classes.button}
          varaint="contained"
          onClick={addTextbox}
        >
          <Typography componenet="h6" variant="h6">
            Add Text
          </Typography>
        </Button>
      </Grid>
      <Grid item>
        <Select
          value={fontSelected}
          onChange={changeFont}
          style={{marginRight: '1em'}}
        >
          {fonts.map(font => (
            <MenuItem key={font} value={font}>
              <div style={{fontFamily: font}}>{font}</div>
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item>
        <Button
          className={classes.button}
          varaint="contained"
          onClick={e => handleColorClick(e)}
        >
          {' '}
          <Typography component="h6" variant="h6">
            Font Color
          </Typography>
        </Button>
        {displayColorPicker ? (
          <div style={popover}>
            <div style={cover} onClick={e => handleClose(e)} />
            <ChromePicker color={fontColor} onChange={handleColorChange} />
          </div>
        ) : null}
      </Grid>
    </Grid>
  )
}

export default FontSection
