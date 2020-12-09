import React, { useState, useEffect, useRef } from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

import TransformableGroup from './TransformableGroup';

const URLImage = props => {
  const [img] = useImage(props.image.src);
  return (
    <>
      <TransformableGroup {...props}>
        <Image image={img}></Image>
      </TransformableGroup>
    </>
  );
};

export default URLImage;
