import React, { useRef, useEffect } from 'react';
import { Layer, Image } from 'react-konva';

import useImage from 'use-image';

const BgLayer = props => {
  const bgLayerRef = useRef();
  useEffect(() => {
    bgLayerRef.current.draw();
  }, [props.store.bgURLindex]);

  return (
    <Layer ref={bgLayerRef}>
      <Image
        id='bglayer'
        image={
          useImage(
            //img src here
            props.store.bgURLS[props.store.bgURLindex]
          )[0]
        }
        height={props.height}
        width={0.7 * props.height}
      />
    </Layer>
  );
};

export default BgLayer;
