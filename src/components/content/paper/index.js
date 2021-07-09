import React, { useRef, useEffect } from 'react';
import { Stage } from 'react-konva';
import { useMeasure } from 'react-use';

import BgLayer from './BgLayer';
import ImagesLayer from './ImagesLayer';
import TextLayer from './TextLayer';

import './paper.scss';

const Paper = props => {
  const [stageContainerRef, { height }] = useMeasure();
  const stageRef = useRef();
  const [selectedId, selectShape] = React.useState(null);

  const checkDeselect = e => {
    // deselect when clicked on empty area
    // console.log(e.target.attrs.id, e.target.getStage().attrs.id);
    const clickedOnEmpty = e.target.attrs.id === 'bglayer';
    if (!clickedOnEmpty) return;
    selectShape(null);
  };

  useEffect(() => {
    console.log(selectedId);
  }, [selectedId]);

  useEffect(() => {
    // textLayerRef.current.draw();
    if (!props.store.stageRef) {
      props.dispatch({
        type: 'SETSTAGEREF',
        stageRef: stageRef,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.store]);

  return (
    <div className='C-paper'>
      <div className='stage' ref={stageContainerRef}>
        <Stage
          id='stage'
          height={height}
          width={0.7 * height}
          ref={stageRef}
          listening={true}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          rotation={props.store.commonConfig.rotation}
        >
          <BgLayer {...props} height={height} />
          <ImagesLayer {...props} selectedId={selectedId} selectShape={selectShape} />
          <TextLayer {...props} selectedId={selectedId} selectShape={selectShape} />
        </Stage>
      </div>
    </div>
  );
};

export default Paper;
