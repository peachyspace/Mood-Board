import React from 'react'
import UploadedSingleImage from './UploadedSingleImage'
// ImageList Component
const ListOfAllUploadedImages = ({images, moveImage}) => {
  // render each image by calling ListOfAllUploadedImage component
  const displayImage = (image, index) => {
    return (
      <UploadedSingleImage
        image={image}
        index={index}
        key={`${image.id}-image`}
        moveImage={moveImage}
      />
    )
  }

  // Return the list of files
  return <section className="file-list">{images.map(displayImage)}</section>
}

export default ListOfAllUploadedImages
