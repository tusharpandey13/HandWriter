import React, { useState, useEffect, useRef } from 'react';
import { Layer } from 'react-konva';

import URLImage from './URLImage';

const ImagesLayer = props => {
  const [images, setImages] = useState([]);
  const imagesLayerRef = useRef();

  useEffect(() => {
    setImages(
      props.store.imageURLS.map((image, i) => {
        return (
          <URLImage
            image={image}
            key={i}
            isSelected={image.id === props.selectedId}
            onSelect={() => {
              props.selectShape(image.id);
              // const tmp = images[i];
              // images.splice(i, 1);
              // images.push(tmp);
              // setImages(images);
            }}
          />
        );
      })
    );
  }, [props.store.imageURLS, props.selectedId, props.selectShape]);

  // useEffect(() => {
  //   imagesLayerRef.current.draw();
  // }, [images]);

  return (
    <Layer draggable={true} listening={true} ref={imagesLayerRef}>
      {images}
    </Layer>
  );
};

export default ImagesLayer;
