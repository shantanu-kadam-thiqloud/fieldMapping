import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableBox = () => {
    const [{ isDragging }, drag] = useDrag({
      type: 'box', // Specify the type here
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    });
  
    return (
      <div
        ref={drag}
        style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
      >
        Drag me!
      </div>
    );
  };

export default DraggableBox;
