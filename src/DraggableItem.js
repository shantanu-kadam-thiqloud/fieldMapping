import { useDrag } from 'react-dnd';

const DraggableItem = ({ id, name }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { id, type: 'box' }, // Make sure to replace 'YOUR_ITEM_TYPE' with the actual type you want to use
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div
      ref={drag}
      style={{ opacity, cursor: 'move' }}
      className="draggable-item"
    >
      {name}
    </div>
  );
};

export default DraggableItem;
