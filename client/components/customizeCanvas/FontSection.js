import React, {useState} from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import {Button, Grid} from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FontFaceObserver from 'fontfaceobserver'

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

  /* const exampleFontData = {
  'Josefin Slab': { weight: 400 },
  'Mali': { weight: 400, color: 'orange' },
  'Aclonica': { weight: 400 },
  'Cutive Mono': { weight: 400 },
  'La Belle Aurore': { weight: 400 },
  'Gravitas One': { weight: 400 },
  'Fascinate': { weight: 400 },
  'Waiting for the Sunrise': { weight: 400 },
  'Pacifico': { weight: 400 },
  'Jacques Francois': { weight: 400 },
  'Lovers Quarrel': { weight: 400 },
  'Hachi Maru Pop': { weight: 400 },
  'Emilys Candy': { weight: 400 },
  'Special Elite': { weight: 400 },
};
let observers =[]
// Make one observer for each font,
// by iterating over the data we already have
Object.keys(exampleFontData).forEach(function(family) {
  var data = exampleFontData[family];
  var obs = new FontFaceObserver(family, data);
  observers.push(obs.load());
});

Promise.all(observers)
  .then(function(fonts) {
    fonts.forEach(function(font) {
      console.log(font.family + ' ' + font.weight + ' ' + 'loaded');
 
      // Map the result of the Promise back to our existing data,
      // to get the other properties we need.
      console.log(exampleFontData[font.family].color);
    });
  })
  .catch(function(err) {
    console.warn('Some critical font are not available:', err);
  }); */

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
      //if(activeObject.text){
      activeObject.fontFamily = e.target.value
      setFontSelected(e.target.value)
      canvas.renderAll()
      // }
    }
  }
  /* function loadAndUse(e) {
    var myfont = new FontFaceObserver(e.target.value)
    myfont.load()
      .then(function() {
        // when font is loaded, use it.
        canvas.getActiveObject().set("fontFamily", e.target.value);
        setFontSelected(e.target.value)
        canvas.requestRenderAll();
      }).catch(function(error) {
        console.log(error)
        
      });
  } */

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
