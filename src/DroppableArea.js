import React from 'react';
import { useDrop } from 'react-dnd';

const DroppableArea = () => {
    const [{ canDrop, isOver }, drop] = useDrop({
      accept: 'box', // Specify the same type here
      drop: () => ({ name: 'DroppableArea' }),
      collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    });
  
    const isActive = canDrop && isOver;
  
    return (
      <div
        ref={drop}
        style={{ backgroundColor: isActive ? 'green' : 'white' }}
      >
        Drop here!
      </div>
    );
  };

export default DroppableArea;
