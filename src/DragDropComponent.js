import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import DraggableBox from './DraggableBox';
import DroppableArea from './DroppableArea';

const App = () => {
    return (
      <div>
        <DraggableBox />
        <DroppableArea />
      </div>
    );
  };
  
  export default App;
  