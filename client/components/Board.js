import React from 'react'
import {useDrop} from 'react-dnd'

const Board = ({images, accept, onDrop}) => {
  //const type = 'Image'
  console.log('board images state:', images)
  const [{isOver, canDrop}, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })
  const isActive = isOver && canDrop
  let backgroundColor = 'white'
  if (isActive) {
    backgroundColor = 'orange'
  } else if (canDrop) {
    backgroundColor = 'blue'
  }

  return (
    <div
      ref={drop}
      className="board"
      opacity={isOver ? 0.5 : 1}
      // style={{ backgroundColor: isOver ? "#bbf" : "rgba(0,0,0,.12" }}
    />
  )
}

export default Board

/* import React from 'react'
import {useDrop} from 'react-dnd'

const Board = ({images},childern) => {
  const type = 'Image'
  console.log('board images state:', images)
  const [{isOver}, drop] = useDrop({
    accept: type,
    drop: (item, monitor) => console.log('item:', item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  

  
  })

  return (
    <div>
      <div>Create Board Down Here</div>
      <div
        ref={drop}
        className="board"
        opacity={isOver ? 0.5 : 1}
        // style={{ backgroundColor: isOver ? "#bbf" : "rgba(0,0,0,.12" }}
      >{childern}</div>
    </div>
  )
}

export default Board */