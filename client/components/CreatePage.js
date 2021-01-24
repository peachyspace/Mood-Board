import React, {useCallback, useState} from 'react'
// Import the dropzone component
import Dropzone from './Dropzone'
import ListOfAllUploadedImages from './ListOfAllUploadedImages'
import cuid from 'cuid'

export default function CreatePage() {
  //intial value of the images state is an array
  const [images, setImages] = useState([])
  // onDrop function
  const onDrop = useCallback(acceptedFiles => {
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

  return (
    <main className="parentOfDropzone">
      <h3>Time To Create</h3>
      <h4 className="text-center">Drag and Drop Example</h4>
      <Dropzone onDrop={onDrop} accept="image/*" />
      <ListOfAllUploadedImages images={images} />
    </main>
  )
}
