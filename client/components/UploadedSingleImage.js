import React from 'react'

// Rendering uploaded individual images
const UploadedSingleImage = ({image}) => {
  return (
    <div className="file-item">
      <img alt={`img - ${image.id}`} src={image.src} className="file-img" />
    </div>
  )
}
export default UploadedSingleImage
