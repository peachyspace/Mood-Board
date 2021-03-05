import React, {useCallback, useState} from 'react'

import Dropzone from './Dropzone'
import ListOfAllUploadedImages from './ListOfAllUploadedImages'
import cuid from 'cuid'
import update from 'immutability-helper'
import {connect} from 'react-redux'
import CanvasBoard from './Canvas'

function CreatePage() {
  //intial value of the images state is an array
  const accepts = 'IMAGE'
  const [images, setImages] = useState([])
  console.log('image Stare: ', images)
  const [index, setindex] = useState(0)
  // onDrop function
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
    // Loop through accepted files
    acceptedFiles.map(file => {
      // Initialize FileReader browser API
      const readerOfFiles = new FileReader()
      // onload callback gets called after the readerOfFiles reads the file data
      readerOfFiles.onload = function(e) {
        // add the image into the state. Since FileReader reading process is asynchronous, its better to get the latest snapshot state (i.e., prevState) and update it.
        setImages(prevState => [
          ...prevState,
          {id: cuid(), src: e.target.result}
        ])
      }
      // Read the file as Data URL (since we accept only images)
      readerOfFiles.readAsDataURL(file)
      return file
    })
  }, [])
  //might not need this
  const moveImage = (dragIndex, hoverIndex) => {
    const draggedImage = images[dragIndex]
    setImages(
      update(images, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, draggedImage]]
      })
    )
  }

  return (
    <main className="parentOfDropzone">
      <h3>Time To Create</h3>
      <h4 className="text-center">Moodboard </h4>
      <CanvasBoard images={images[0]} />
      <Dropzone onDrop={onDrop} accept="image/*" />

      <ListOfAllUploadedImages images={images} moveImage={moveImage} />
    </main>
  )
}
const mapState = state => {
  return {
    user: state.user
  }
}
export default connect(mapState, null)(CreatePage)
