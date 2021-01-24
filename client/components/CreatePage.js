import React, {useCallback} from 'react'
// Import the dropzone component
import Dropzone from './Dropzone'

export default function CreatePage() {
  // onDrop function
  const onDrop = useCallback(acceptedFiles => {
    // this callback will be called after files get dropped, we will get the acceptedFiles. If you want, you can even access the rejected files too
    // We pass onDrop function and accept prop to the component. It will be used as initial params for useDropzone hook
    console.log(acceptedFiles)
  }, [])
  return (
    <main className="parentOfDropzone">
      <h3>Time To Create</h3>
      <h4 className="text-center">Drag and Drop Example</h4>
      <Dropzone onDrop={onDrop} accept="image/*" />
    </main>
  )
}
