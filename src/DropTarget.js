import { useDrop } from 'react-dnd';

const DropTarget = ({ onDrop }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'item',
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;
  const backgroundColor = isActive ? 'green' : 'white';

  return (
    <div ref={drop} className="drop-target" style={{ backgroundColor }}>
      {isActive ? 'Release to drop' : 'Drag item here'}
    </div>
  );
};

export default DropTarget;
