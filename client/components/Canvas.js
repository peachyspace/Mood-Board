import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {fabric} from 'fabric'
import {makeStyles} from '@material-ui/core/styles'
import {Button, Grid} from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import SaveIcon from '@material-ui/icons/Save'
import Fab from '@material-ui/core/Fab'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none'
  },
  button: {
    margin: theme.spacing(1)
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
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const CanvasBoard = ({saveButtonClick, moodboardCanvas}) => {
  const classes = useStyles()
  const [canvas, setCanvas] = useState('')
  useEffect(() => {
    //create canvas
    let canvBoard = new fabric.Canvas('canvas', {
      height: 800,
      width: 800
    })
    //if mmodboardCanvas has keys then execute the following
    console.log('moodboardCanvas: ', moodboardCanvas)
    let parsed = JSON.parse(moodboardCanvas.canvas)
    //uploading users canvas from database
    canvBoard.loadFromJSON(parsed, () => {
      canvBoard.renderAll()
    })
    setCanvas(canvBoard)
  }, [])

  console.log('object of BOard: ', JSON.parse(moodboardCanvas.canvas))

  const hiddenFileInput = React.useRef(null)

  const addPicture = canv => {
    fabric.Image.fromURL(
      'https://kelleynan.com/wp-content/uploads/2019/04/two-story-family-room-neutral-decor.jpg',
      function(myImg) {
        //scales image
        myImg.scale(0.5).set('flipX', true)
        canv.add(myImg)
        console.log('images: ', myImg)
      }
    )
  }

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
  const changeBackgroundColor = e => {
    e.preventDefault()
    canvas.backgroundColor = '#c8691c'
    //'#d6e2e9'
    canvas.renderAll()
  }

  return (
    <div>
      {/* <button type="button" onClick={() => addPicture(canvas)}>
        Add Picture
      </button> */}

      <br />
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
      <br />
      <br />
      <canvas id="canvas" />
      <br />
      <Button
        type="button"
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={e => saveButtonClick(e, canvas)}
        startIcon={<SaveIcon />}
      >
        {' '}
        Save Moodboard{' '}
      </Button>
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
      <br />
      <Button
        type="button"
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={e => changeBackgroundColor(e)}
      >
        change color
      </Button>
    </div>
  )
}
const mapState = state => {
  return {
    userId: state.user.id
  }
}

export default connect(mapState, null)(CanvasBoard)
