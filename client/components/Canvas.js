import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {fabric} from 'fabric'
//import {canvasSaver} from '../store'

const CanvasBoard = ({setUserCanvas, saveButtonClick}) => {
  const [canvas, setCanvas] = useState('')
  useEffect(() => {
    setCanvas(initCanvas())
  }, [])

  const initCanvas = () =>
    new fabric.Canvas('canvas', {
      height: 800,
      width: 800,
      backgroundColor: 'white'
    })

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

  function dataURLtoBlob(dataurl) {
    const arr = dataurl.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    console.log('mime: ', mime)
    const bstr = atob(arr[1])
    // console.log('arr[1]: ', arr[1])
    //console.log('bstr: ', bstr)
    //console.log('gkgkgjhhkh')
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
      //console.log(`ur8ar[${n}]: `, u8arr[n])
    }
    return new Blob([u8arr], {type: 'image/png'})
  }

  const downloadButtonClick = function() {
    //an HTML <a> element is represented by an anchor object
    const link = document.createElement('a')
    //conveting canvas to URL
    //a data URI is returned and it holds a representstion of the canvas in the format you specified
    //const imgData = canvas.toDataURL({format: 'png', multiplier: 4})
    const imgData = canvas.toDataURL('image/png')
    //const strDataURI = imgData.substr(22, imgData.length)
    const blob = dataURLtoBlob(imgData)
    console.log('BLOB: ', blob)
    const objurl = URL.createObjectURL(blob)

    link.download = 'holapic.png'

    link.href = objurl

    link.click()
  }

  /* const downloadButtonClick = (e) => {
    e.preventDefault()
    const canvas1 = document.getElementById('canvas')
    const dataURI = canvas1.toDataURL('png')
    console.log(dataURI)
    console.log(canvas.toSVG())
  } */

  return (
    <div>
      <button type="button" onClick={() => addPicture(canvas)}>
        Add Picture
      </button>

      <br />
      <br />
      <input type="file" id="file" onClick={() => addFile(canvas)} />

      <br />
      <canvas id="canvas" />
      <br />
      <button type="button" onClick={e => saveButtonClick(e, canvas)}>
        {' '}
        Save Moodboard{' '}
      </button>
      <br />
      <button type="button" onClick={e => downloadButtonClick(e)}>
        Download
      </button>
    </div>
  )
}
const mapState = state => {
  return {
    userId: state.user.id
  }
}

export default connect(mapState, null)(CanvasBoard)
