import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {fabric} from 'fabric'
import {makeStyles} from '@material-ui/core/styles'
import {Button, Grid} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp'
import Typography from '@material-ui/core/Typography'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import WebFont from 'webfontloader'
import Zoom from './Zoom'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  container: {
    alignItems: 'center'
  }
}))

const CanvasBoard = ({
  saveButtonClick,
  createButtonClick,
  create,
  setUserCanvas,
  canvasHeight,
  canvasWidth,
  createHeight,
  createWidth,
  canvasTitle,
  getTitle,
  setEditCanvas,
  moodboardCanvas,
  createFormat,
  zoomValue,
  setZoomValue,
  storedFormat
}) => {
  const classes = useStyles()
  const [canvas, setCanvas] = useState('')
  //const [zoomValue, setZoomValue] = useState(25)
  useEffect(() => {
    let canvBoard = new fabric.Canvas('canvas', {
      height: 800,
      width: 800,
      selection: true
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

    setCanvas(canvBoard)

    if (create) {
      canvBoard.setHeight(createHeight)
      canvBoard.setWidth(createWidth)
      setUserCanvas(canvBoard)
    } else {
      canvBoard.setHeight(canvasHeight)
      canvBoard.setWidth(canvasWidth)
      setEditCanvas(canvBoard)
    }
  }, [])

  const hiddenFileInput = React.useRef(null)

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
            canv.add(oImg)
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

  const handleDeleteSelected = () => {
    //deletes object that is selected in canvas
    let activeObject = canvas.getActiveObject()
    if (activeObject !== null) {
      canvas.remove(activeObject)
    }
  }

  fabric.util.addListener(canvas.upperCanvasEl, 'click', function(e) {
    let _canvas = canvas
    //current mouse position
    //active object (that has been selected on click)
    let _active = _canvas.getActiveObject()

    if (_active) {
      canvas.bringToFront(_active)
    }
  })
  const getFormat = () => {
    if (createFormat) {
      return createFormat
    } else {
      return storedFormat
    }
  }
  return (
    <Grid container justify="center">
      <Zoom
        zoomValue={zoomValue}
        setZoomValue={setZoomValue}
        format={getFormat()}
      />
      <div className="zoom" id="canvasHolder">
        {/*         <br />
        <br /> */}
        <canvas id="canvas" />
        <br />
        <br />
      </div>
      <Grid container>
        <Grid container direction="row">
          <Grid
            item
            container
            className={classes.container}
            style={{marginBottom: '1em'}}
            justify="center"
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
                  Save Moodboard
                </Typography>
              </Button>
            ) : (
              <Button
                type="button"
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={e => createButtonClick(e)}
                startIcon={<SaveIcon />}
              >
                <Typography component="h6" variant="h6">
                  Create Moodboard
                </Typography>
              </Button>
            )}
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
    </Grid>
  )
}
const mapState = state => {
  return {
    userId: state.user.id
  }
}

export default connect(mapState, null)(CanvasBoard)
