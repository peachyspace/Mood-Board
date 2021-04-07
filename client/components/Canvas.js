import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {fabric} from 'fabric'
import {makeStyles} from '@material-ui/core/styles'
import {Button, Grid} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp'
import Typography from '@material-ui/core/Typography'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import {ChromePicker} from 'react-color'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FontSection from './customizeCanvas/FontSection'
//import FontFaceObserver from'fontfaceobserver'
import WebFont from 'webfontloader'
const useStyles = makeStyles(theme => ({
  input: {
    display: 'none'
  },
  button: {
    margin: theme.spacing(1)
  },
  container: {
    marginTop: 10
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 250
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const CanvasBoard = ({
  saveButtonClick,
  moodboardCanvas,
  create,
  setUserCanvas,
  setFormat,
  canvasFormat,
  createFormat,
  canvasHeight,
  canvasWidth,
  createHeight,
  createWidth,
  setCreateHeight,
  setCreateWidth,
  canvasTitle,
  getTitle,
  setCreateBackgroundColor,
  createBackgroundColor,
  canvasBC,
  setEditCanvas
}) => {
  const classes = useStyles()
  const [canvas, setCanvas] = useState('')
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState(
    JSON.parse(!create ? canvasBC : `{}`)
  )

  const canvasPosts = [
    {
      id: 0,
      format: 'Regular Canvas Size',
      size: {
        height: 800,
        width: 800
      }
    },
    {
      id: 1,
      format: 'Pinterest Post Size',
      size: {
        width: 1000,
        height: 1000
      }
    },
    {
      id: 2,
      format: 'Instagram Potrait Size',
      size: {
        width: 1080,
        height: 1350
      }
    },
    {
      id: 3,
      format: 'Facebook Potrait Size',
      size: {
        width: 630,
        height: 1200
      }
    }
  ]

  const getFormat = format => {
    for (let i = 0; i <= canvasPosts.length - 1; i++) {
      if (canvasPosts[i].format === format) {
        return i
      }
    }
    return ''
  }

  let intialFormat
  if (canvasFormat) {
    intialFormat = canvasFormat
  } else {
    intialFormat = createFormat
  }
  const [selectedSize, setSelectedSize] = useState(
    canvasPosts[getFormat(intialFormat)]
  )

  /* const exampleFontData = {
    'Josefin Slab': { weight: 400 },
    'Mali': { weight: 400 },
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
  let observers =[] */

  useEffect(() => {
    let canvBoard = new fabric.Canvas('canvas', {
      height: 800,
      width: 800,
      selection: true
      //preserveObjectStacing: true
    })
    WebFont.load({
      google: {
        families: [
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
      },
      active: function() {
        if (moodboardCanvas) {
          //if mmodboardCanvas has keys then execute the following
          let parsed = JSON.parse(moodboardCanvas.canvas)
          //uploading users canvas from database
          canvBoard.loadFromJSON(parsed, () => {
            canvBoard.renderAll()
          })
        }
      }
    })

    /* if (moodboardCanvas) {
      //if mmodboardCanvas has keys then execute the following
      let parsed = JSON.parse(moodboardCanvas.canvas)
      //uploading users canvas from database
      canvBoard.loadFromJSON(parsed, () => {
        canvBoard.renderAll()
       
      })
    } */
    setCanvas(canvBoard)
    //setUserCanvas(canvBoard)
    console.log(canvas)
    //changes size of canvas on the DOM from 800 x 800 to canvBoard.height x canvBoard.width
    //canvBoard.preserveObjectStacking= false
    console.log('canvBoard.height: ', canvBoard.height)
    console.log('canvasHeight: ', canvasHeight)

    if (create) {
      canvBoard.setHeight(createHeight)
      canvBoard.setWidth(createWidth)
      setUserCanvas(canvBoard)
    } else {
      console.log(canvasHeight)
      canvBoard.setHeight(canvasHeight)
      canvBoard.setWidth(canvasWidth)
      setEditCanvas(canvBoard)
    }

    /* if (setUserCanvas) {
      setUserCanvas(canvBoard)
    } */
  }, [])

  const hiddenFileInput = React.useRef(null)

  /* const addPicture = (canv) => {
    fabric.Image.fromURL(
      'https://kelleynan.com/wp-content/uploads/2019/04/two-story-family-room-neutral-decor.jpg',
      function (myImg) {
        //scales image
        myImg.scale(0.5).set('flipX', true)
        canv.add(myImg)
        console.log('images: ', myImg)
      }
    )
  } */
  console.log(canvas)

  const addFile = canv => {
    let uploaded = 0
    hiddenFileInput.current.click()
    document.getElementById('file').addEventListener('change', function(e) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = function(f) {
        const data = f.target.result

        fabric.Image.fromURL(data, function(img) {
          while (uploaded === 0) {
            const oImg = img.scale(0.5).set('flipX', true)
            console.log('oImg', oImg)
            //canv.clear()
            canv.add(oImg)
            //canv.sendBackwards(oImg)
            //canv.setActiveObject(oImg)
            console.log('CANVAS: ', canvas)
            uploaded++
          }
        })
      }
      reader.readAsDataURL(file)
    })
  }

  function dataURLtoBlob(dataURL) {
    const arrayOfDataURL = dataURL.split(',')
    //grabbing the mine type from arrayOfDataURL
    const mime = arrayOfDataURL[0].match(/:(.*?);/)[1]
    console.log('mime: ', mime)
    //using the atob() function to decode a base-64 encoded string
    const bstr = atob(arrayOfDataURL[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      /*  the charCodeAt() funtion returns an integer that represents a unit in the UTF-16 code */
      u8arr[n] = bstr.charCodeAt(n)
    }
    //creating a new blob
    return new Blob([u8arr], {type: 'image/png'})
  }

  const downloadButtonClick = function() {
    //an HTML <a> element is represented by an anchor object
    const link = document.createElement('a')
    //conveting canvas to URL
    /* a data URI is returned and it holds a representstion of the canvas in the format you specified */
    const imgData = canvas.toDataURL('image/png')
    const blob = dataURLtoBlob(imgData)
    /* creates a DOMstring that contains a URL representing the object (blob) passed as an agrument */
    const objurl = URL.createObjectURL(blob)
    //gives the anchor object(<a>) a fiename
    if (create) {
      link.download = `${getTitle()}.png`
    } else {
      link.download = `${canvasTitle}.png`
    }

    //the URL is being given to the anchor object(<a>)
    link.href = objurl
    //we are simulating a mouse click on the <a> element
    link.click()
  }

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

  const getPostSizeId = id => {
    for (let i = 0; i <= canvasPosts.length - 1; i++) {
      if (canvasPosts[i].id === id) {
        return id
      }
    }
    return ''
  }

  const handleSizeChange = event => {
    setSelectedSize(event.target.value)
    setFormat(event.target.value.format)
    canvas.setDimensions(event.target.value.size)
    if (create) {
      setCreateHeight(event.target.value.size.height)
      setCreateWidth(event.target.value.size.width)
    }
    canvas.calcOffset()
    canvas.renderAll()
    console.log(canvas)
  }

  const handleDeleteSelected = () => {
    //deletes object that is selected in canvas
    let activeObject = canvas.getActiveObject()
    if (activeObject !== null) {
      canvas.remove(activeObject)
    }
  }

  /* const addTextbox = () => {
    let textbox = new fabric.Textbox('', {
      left: 50,
      top: 50,
      width: 150,
      fontSize: 20,
      fontFamily: 'Josefin Slab'
    })
    canvas.add(textbox).setActiveObject(textbox)
  } */

  fabric.util.addListener(canvas.upperCanvasEl, 'click', function(e) {
    let _canvas = canvas
    //current mouse position
    /* let _mouse = _canvas.getPointer(e); */
    //active object (that has been selected on click)
    let _active = _canvas.getActiveObject()

    if (_active) {
      canvas.bringToFront(_active)
      console.log(_active)
      if (_active.text) {
        console.log(_active.text, _active.fontFamily)
      }
    }
    /*   //possible dblclick targets (objects that share mousepointer)
  let _targets = _canvas.getObjects().filter(function (_obj) {
      return _obj.containsPoint(_mouse) && !_canvas.isTargetTransparent(_obj, _mouse.x, _mouse.y);
  }) */
  })

  return (
    <Grid container justify="center">
      <div>
        <br />
        <br />
        <canvas id="canvas" />
        <br />
        <Grid container>
          <Grid container direction="row" style={{marginTop: '1em'}}>
            <Grid
              item
              container
              className={classes.container}
              alignItems="center"
              style={{marginTop: '1em', marginLeft: '1em'}}
            >
              <Grid item>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={handleDeleteSelected}
                  startIcon={<DeleteForeverSharpIcon />}
                />
              </Grid>
              {/*  <Grid item >
                <Button onClick={e => handleColorClick(e)}>
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
              <Grid item>
                  <FontSection canvas ={canvas}/>
              </Grid>
              <br />
              <Grid item style={{marginLeft: '1em'}}>
                <FormControl className={classes.formControl}>
                  <Select
                    value={canvasPosts[getPostSizeId(selectedSize.id)]}
                    onChange={handleSizeChange}
                  >
                    {canvasPosts.map(canvasPost => (
                      <MenuItem key={canvasPost.id} value={canvasPost}>
                        <Typography component="h6" variant="h6">
                          {canvasPost.format}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid> */}
              <br />
              <input
                type="file"
                id="file"
                ref={hiddenFileInput}
                style={{display: 'none'}}
              />
              <label htmlFor="contained-button-file">
                <Button
                  type="button"
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  startIcon={<AddPhotoAlternateIcon />}
                  onClick={() => addFile(canvas)}
                >
                  <Typography component="h6" variant="h6">
                    Upload
                  </Typography>
                </Button>
              </label>

              {!create ? (
                <Button
                  type="button"
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={e => saveButtonClick(e, canvas)}
                  startIcon={<SaveIcon />}
                >
                  <Typography component="h6" variant="h6">
                    Save Canvas
                  </Typography>
                </Button>
              ) : null}
              <br />
              <Button
                type="button"
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={e => downloadButtonClick(e)}
              >
                <Typography component="h6" variant="h6">
                  Download
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <br />
      </div>
    </Grid>
  )
}
const mapState = state => {
  return {
    userId: state.user.id
  }
}

export default connect(mapState, null)(CanvasBoard)
