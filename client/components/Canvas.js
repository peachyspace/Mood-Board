import React from 'react'
import {fabric} from 'fabric'

class Canvas extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }
  componentDidMount() {
    const canvasBoard = new fabric.Canvas('canvas', {
      selection: false,
      preserveObjectStacking: true,
      width: 1200,
      height: 700
    })
  }

  render() {
    return (
      <div className="canvas-wrapper">
        <canvas id="canvas" />
      </div>
    )
  }
}

export default Canvas
