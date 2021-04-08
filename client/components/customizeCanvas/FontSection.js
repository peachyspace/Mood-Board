import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import {Button, Grid} from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles(theme => ({
  titlesContainer: {
    marginTop: 70,
    display: 'flex',
    flexDirection: 'column',
    //alignItems: 'center',
    justify: 'center'
  },
  container: {
    marginTop: 50
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
  //const [fontCanvas, setFontCanvas] = useState(canvas)
  //console.log(fontCanvas)
  console.log(canvas)
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

  return (
    <Grid container /* justify = 'center' */>
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
        <Select value={fontSelected} onChange={changeFont}>
          {fonts.map(font => (
            <MenuItem key={font} value={font}>
              <div style={{fontFamily: font}}>{font}</div>
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  )
}

export default FontSection
