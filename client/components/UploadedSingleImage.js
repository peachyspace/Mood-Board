import React, {useRef} from 'react'
import {useDrag, useDrop} from 'react-dnd'
// Rendering uploaded individual images
const type = 'Image'
const UploadedSingleImage = ({image, index, moveImage}) => {
  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: type,
    // This method is called when we hover over an element while dragging
    hover(item) {
      // item is the dragged element
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      // current element where the dragged element is hovered on
      const hoverIndex = index
      // If the dragged element is hovered in the same place, then do nothing
      if (dragIndex === hoverIndex) {
        return
      }
      // If it is dragged around other elements, then move the image and set the state with position changes
      moveImage(dragIndex, hoverIndex)
      /*
            Update the index for dragged item directly to avoid flickering
            when the image was half dragged into the next
          */
      item.index = hoverIndex
    }
  })

  const [{isDragging}, drag] = useDrag({
    // item denotes the element type, unique identifier (id) and the index (position)
    // isDragging: (monitor) => (console.log(item)),
    item: {type, id: image.id, index},
    // collect method is like an event listener, it monitors whether the element is dragged and expose that information
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  /* 
        Initialize drag and drop into the element using its reference.
        Here we initialize both drag and drop on the same element (i.e., Image component)
        */
  drag(drop(ref))

  return (
    <div
      ref={ref}
      //style={{opacity: isDragging ? 0 : 1}}
      opacity={isDragging ? '0.5' : '1'}
      className="file-item"
    >
      <img alt={`img - ${image.id}`} src={image.src} className="file-img" />
    </div>
  )
}
export default UploadedSingleImage
