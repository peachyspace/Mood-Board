import React from 'react'
// Import the useDropzone hooks from react-dropzone
import {useDropzone} from 'react-dropzone'

const Dropzone = ({onDrop, accept}) => {
  // Initializing useDropzone hooks with options
  console.log('heyyyy')
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept
  })

  /* 
    useDropzone hooks exposes two functions called getRootProps and getInputProps
    and also exposes isDragActive boolean
  */

  return (
    <div className="dropzone" {...getRootProps()}>
      <input className="dropzone-input" {...getInputProps()} />
      <div className="text-center">
        {isDragActive ? (
          <p className="dropzone-content">Release to drop the files here</p>
        ) : (
          <p className="dropzone-content">
            Drag and drop your files here, or click to select files
          </p>
        )}
      </div>
    </div>
  )
}

export default Dropzone

/* const getClassName = (className, isActive) => {
  if (!isActive) return className;
  return `${className} ${className}-active`;
};

...
<div className={getClassName("dropzone", isDragActive)} {...getRootProps()}></div> */
