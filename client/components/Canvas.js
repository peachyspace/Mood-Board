import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {fabric} from 'fabric'
import {makeStyles} from '@material-ui/core/styles'
import {Button, Grid} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import Typography from '@material-ui/core/Typography'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import {ChromePicker} from 'react-color'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
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
  canvasBC
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

  useEffect(() => {
    //create canvas
    let canvBoard = new fabric.Canvas('canvas', {
      height: 800,
      width: 800
    })

    if (moodboardCanvas) {
      //if mmodboardCanvas has keys then execute the following
      let parsed = JSON.parse(moodboardCanvas.canvas)
      //uploading users canvas from database
      canvBoard.loadFromJSON(parsed, () => {
        canvBoard.renderAll()
      })
    }
    setCanvas(canvBoard)
    console.log(canvBoard)
    //changes size of canvas on the DOM from 800 x 800 to canvBoard.height x canvBoard.width
    console.log('canvBoard.height: ', canvBoard.height)
    console.log('canvasHeight: ', canvasHeight)
    if (create) {
      canvBoard.setHeight(createHeight)
      canvBoard.setWidth(createWidth)
    } else {
      console.log(canvasHeight)
      canvBoard.setHeight(canvasHeight)
      canvBoard.setWidth(canvasWidth)
    }

    if (setUserCanvas) {
      setUserCanvas(canvBoard)
    }
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
            canv.add(oImg)
            canvas.setActiveObject(oImg)
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

  const handleChange = event => {
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
              <div>
                <Grid item style={{marginLeft: '2em'}}>
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
              </div>
              <br />
              <Grid item style={{marginLeft: '1em'}}>
                <FormControl className={classes.formControl}>
                  {/*  <InputLabel id='demo-simple-select'>Size</InputLabel> */}
                  <Select
                    //lableId = 'demo-simple-select'
                    //defaultValue = ""
                    value={canvasPosts[getPostSizeId(selectedSize.id)]}
                    onChange={handleChange}
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
              </Grid>
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
                  {' '}
                  Upload{' '}
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
                  {' '}
                  Save Canvas{' '}
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
                Download
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
