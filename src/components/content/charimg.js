import React, { useEffect, useRef } from 'react';
import { Image } from 'react-konva';
// import { useUpdateEffect } from 'react-use';

const CharImg = props => {
  const imgRef = useRef();
  useEffect(() => {
    imgRef.current.cache();
    imgRef.current.getLayer().batchDraw();
  }, []);

  return <Image image={props.image} id={props.id} ref={imgRef}></Image>;
};

export default CharImg;
