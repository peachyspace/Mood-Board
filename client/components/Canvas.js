import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {fabric} from 'fabric'
import {makeStyles} from '@material-ui/core/styles'
import {Button, Grid} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import Typography from '@material-ui/core/Typography'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import {ChromePicker} from 'react-color'
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
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const CanvasBoard = ({
  saveButtonClick,
  moodboardCanvas,

  create,
  setUserCanvas
}) => {
  const classes = useStyles()
  const [canvas, setCanvas] = useState('')
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [background, setBackground] = useState({
    r: 250,
    g: 0,
    b: 0.2,
    a: 1
  })

  //const [opacityBg, setOpacityBg] = useState("1");

  useEffect(() => {
    //create canvas
    let canvBoard = new fabric.Canvas('canvas', {
      height: 800,
      width: 800
    })

    if (moodboardCanvas) {
      //if mmodboardCanvas has keys then execute the following
      let parsed = JSON.parse(moodboardCanvas.canvas)
      //uploading users canvas        from database
      canvBoard.loadFromJSON(parsed, () => {
        canvBoard.renderAll()
      })
    }
    setCanvas(canvBoard)
    if (setUserCanvas) {
      setUserCanvas(canvBoard)
    }
  }, [])

  /* console.log('object of BOard: ', JSON.parse(moodboardCanvas.canvas)) */

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
    link.download = 'holapic.png'
    //the URL is being given to the anchor object(<a>)
    link.href = objurl
    //we are simulating a mouse click on the <a> element
    link.click()
  }

  const handleClick = e => {
    //want it to do the opposite
    e.preventDefault()
    setDisplayColorPicker(!displayColorPicker)
  }
  const handleClose = e => {
    e.preventDefault()
    setDisplayColorPicker(false)
  }

  const handleChangeComplete = data => {
    //allows cursor to move
    if (data.hsl !== background) {
      //console.log('data: ', data)
      let rgba = `rgba(${data.rgb.r}, ${data.rgb.g}, ${data.rgb.b}, ${
        data.rgb.a
      })`
      canvas.backgroundColor = rgba
      canvas.renderAll()
      setBackground(data.rgb)
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
              style={{marginTop: '1em', marginLeft: '6em'}}
            >
              <div>
                <Grid item style={{marginLeft: '2em'}}>
                  <Button onClick={e => handleClick(e)}>
                    {' '}
                    <Typography component="h6" variant="h6">
                      Background Color
                    </Typography>
                  </Button>
                  {displayColorPicker ? (
                    <div style={popover}>
                      <div style={cover} onClick={e => handleClose(e)} />
                      <ChromePicker
                        color={background}
                        onChange={handleChangeComplete}
                      />
                    </div>
                  ) : null}
                </Grid>
              </div>
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
