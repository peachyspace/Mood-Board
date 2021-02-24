import React, {useState, useEffect} from 'react'
import {fabric} from 'fabric'

const CanvasBoard = () => {
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
            uploaded++
          }
        })
      }
      reader.readAsDataURL(file)
    })
  }

  return (
    <div>
      <button onClick={() => addPicture(canvas)}>Add Picture</button>

      <br />
      <br />
      <input type="file" id="file" onClick={() => addFile(canvas)} />

      <br />
      <canvas id="canvas" />
    </div>
  )
}
export default CanvasBoard
