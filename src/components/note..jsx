import React, { forwardRef } from 'react'

const Note = forwardRef(({content, initialPos, ...props}, ref) => {
  return (
    <div 
        ref = {ref}
        style={{
            position: 'absolute',
            left : `${initialPos?.x}px`,
            top : `${initialPos?.y}px`,
            border : "1px solid black",
            padding : '10px',
            width : '200px',
            cursor: "move",
            backgroundColor : "lightblue",
        }}
        {...props}
        >
        📌 {content}
    </div>
  )
});

export default Note;
