import React from 'react'
import UploadedSingleImage from './UploadedSingleImage'
// ImageList Component
const ListOfAllUploadedImages = ({images}) => {
  // render each image by calling ListOfAllUploadedImage component
  const displayImage = (image, index) => {
    return <UploadedSingleImage image={image} key={`${image.id}-image`} />
  }

  // Return the list of files
  return <section className="file-list">{images.map(displayImage)}</section>
}

export default ListOfAllUploadedImages
