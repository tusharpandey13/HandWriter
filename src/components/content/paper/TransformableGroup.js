import React from 'react';
import { Transformer, Group } from 'react-konva';

const TransformableGroup = ({ isSelected, onSelect, children, offsetY = 0 }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Group
        offsetY={offsetY}
        draggable={true}
        listening={true}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        onMouseEnter={e => {
          // style stage container:
          const container = e.target.getStage().container();
          container.style.cursor = 'all-scroll';
        }}
        onMouseLeave={e => {
          const container = e.target.getStage().container();
          container.style.cursor = 'default';
        }}
        // onDragEnd={e => {
        //   // props.onChange({
        //   //   // ...shapeProps,
        //   //   x: e.target.x(),
        //   //   y: e.target.y(),
        //   // });
        // }}
        // onTransformEnd={e => {
        // transformer is changing scale of the node
        // and NOT its width or height
        // but in the store we have only width and height
        // to match the data better we will reset scale on transform end
        // const node = shapeRef.current;
        // const scaleX = node.scaleX();
        // const scaleY = node.scaleY();

        // we will reset it back
        // node.scaleX(1);
        // node.scaleY(1);
        // props.onChange({
        //   // ...shapeProps,
        //   x: node.x(),
        //   y: node.y(),
        //   // set minimal value
        //   width: Math.max(5, node.width() * scaleX),
        //   height: Math.max(node.height() * scaleY),
        // });
        // }}
      >
        {children}
      </Group>

      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default TransformableGroup;
