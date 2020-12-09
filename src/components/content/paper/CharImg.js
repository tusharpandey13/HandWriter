import React from 'react';
import { Image } from 'react-konva';

const CharImg = props => {
  // const [image, status] = useImage(props.src);
  // const imageRef = useRef();
  // console.log(`drawing ${props.i1}`);
  // useEffect(() => {
  //   if (props.image) {
  //     // you many need to reapply cache on some props changes like shadow, stroke, etc.
  //     // imageRef.current.cache();
  //     // since this update is not handled by "react-konva" and we are using Konva methods directly
  //     // we have to redraw layer manually
  //     // imageRef.current.getLayer().batchDraw();
  //   }
  // }, [props]);
  return (
    <Image
      // image={props.store.chars[e1.char]}
      image={props.image}
      // ref={imageRef}
      // key={props.i1}
      x={props.e1.x}
      y={props.e1.y}
      offsetY={props.e1.offsetY}
      scaleX={(props.e1.scaleX * props.store.commonConfig.scale) / 100}
      scaleY={((props.e1.scaleY ?? 1) * props.store.commonConfig.scale) / 100}
      opacity={props.e1.opacity * props.store.commonConfig.opacity}
      rotation={props.e1.rotation}
      width={props.e1.width}
      height={props.e1.height}
      listening={true}
      // filters={[Konva.Filters.Blur]}
      // blurRadius={10}
    />
  );
};

export default CharImg;
