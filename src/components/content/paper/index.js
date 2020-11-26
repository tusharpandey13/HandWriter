import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Image, Group } from 'react-konva';
import { useMeasure } from 'react-use';
import useImage from 'use-image';
import { initialState, dimMap } from '../store';

import './paper.scss';

const rand = (min, max) => Math.random() * (max - min) + min;

const CharImg = props => {
  // console.log(props.e1);
  // const [image, status] = useImage(props.src);
  return (
    <Image
      // image={props.store.chars[e1.char]}
      image={props.image}
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
      listening={false}
    />
  );
};

const Paper = props => {
  const [stageContainerRef, { height }] = useMeasure();
  const [textData, setTextData] = useState([]);
  const textLayerRef = useRef();
  const bgLayerRef = useRef();
  const stageRef = useRef();

  useEffect(() => {
    const textlayout = text => {
      let lastspace = false;
      let hyphenflag = -1;
      let tmpx = rand(-4, 4);
      let tmpy = rand(-1, 0);
      const tmprotation = rand(-10, 10);
      let out = [[]];
      for (let i = 0; i < text.length; i += 1) {
        if (!(text[i].charCodeAt(0) >= 32 && text[i].charCodeAt(0) < 126)) continue;
        if (text[i] === '\n') {
          out.push([]);
          tmpx = rand(-4, 4);
        } else if (text[i] === ' ') {
          tmpx += rand(8, 12);
          if (
            hyphenflag === -1 &&
            tmpx >= props.store.commonConfig.left + props.store.commonConfig.width
          ) {
            out.push([]);
            tmpx = rand(-4, 4);
            // console.log(text[i - 1], text[i], text[i + 1]);
          }
          lastspace = true;
        } else {
          console.log(`outputting : ${text[i]}`);

          const scaleX = rand(0.9, 1.3) * dimMap[text[i]][6];
          if (props.store.commonConfig.cols - out[out.length - 1].length < 11) {
            let tmpsum = 0;
            for (let j = 0; j < 3; j += 1) {
              tmpsum +=
                ((dimMap[text[i + j]] ?? [0])[0] * scaleX * props.store.commonConfig.scale) / 100;
              if (
                hyphenflag === -1 &&
                !'\n. '.includes(text[i + j]) &&
                tmpx + tmpsum >= props.store.commonConfig.left + props.store.commonConfig.width
              ) {
                // console.log(`found : ${text[i]}`);
                hyphenflag = i + j;
                if (lastspace) {
                  out.push([]);
                  i = i + j;
                  // console.log(`decremented, new ele : ${text[i]}`);
                  // console.log(out[out.length - 1]);
                  tmpx = rand(-4, 4);
                  hyphenflag = -1;
                }
                break;
              }
            }
          }

          lastspace = false;
          out[out.length - 1].push({
            char: hyphenflag === i ? '-' : text[i],
            x: tmpx + dimMap[text[i]][4],
            y: tmpy,
            width: dimMap[text[i]][0],
            height: dimMap[text[i]][1],
            scaleX: scaleX,
            scaleY: dimMap[text[i]][7],
            opacity: rand(0.875, 1),
            rotation: rand(0, tmprotation),
            offsetY:
              -props.store.commonConfig.linespacing +
              dimMap[text[i]][1] * dimMap[text[i]][7] -
              dimMap[text[i]][3],
          });
          tmpx +=
            (dimMap[text[i]][0] * props.store.commonConfig.scale * scaleX) / 100 + dimMap[text[i]][5];
          if (hyphenflag === i) {
            i--;
            hyphenflag = -1;
            out.push([]);
            tmpx = rand(-4, 4);
          }
        }
      }
      return out;
    };

    setTextData(textlayout(props.store.text));
  }, [
    props.store.text,
    props.store.commonConfig.scale,
    props.store.commonConfig.width,
    props.store.commonConfig.cols,
  ]);

  useEffect(() => {
    textLayerRef.current.draw();
    // console.log(stageRef.current);
    if (!props.store.stageRef) {
      props.dispatch({
        type: 'SETSTAGEREF',
        stageRef: stageRef,
      });
    }
    // console.log(props.store.chars);
  }, [props.store]);

  useEffect(() => {
    bgLayerRef.current.draw();
  }, [props.bgURLindex]);

  return (
    <div className='C-paper'>
      <div className='stage' ref={stageContainerRef}>
        <Stage height={height} width={0.7 * height} ref={stageRef}>
          <Layer ref={bgLayerRef}>
            <Image
              image={
                useImage(
                  //img src here
                  props.store.bgURLS[props.store.bgURLindex]
                )[0]
              }
              height={height}
              width={0.7 * height}
            />
          </Layer>
          <Layer
            imageSmoothingEnabled={true}
            offsetY={props.store.commonConfig.top}
            offsetX={props.store.commonConfig.left}
            ref={textLayerRef}
            draggable={true}
            onMouseEnter={e => {
              // style stage container:
              const container = e.target.getStage().container();
              container.style.cursor = 'all-scroll';
            }}
            onMouseLeave={e => {
              const container = e.target.getStage().container();
              container.style.cursor = 'default';
            }}
          >
            {textData.map((e0, i0) => {
              let tmpy =
                (i0 * props.store.commonConfig.linespacing * props.store.commonConfig.scale) / 100;
              return (
                <Group y={tmpy} key={i0}>
                  {e0.map((e1, i1) => {
                    return <CharImg image={props.store.chars[e1.char]} i1={i1} e1={e1} {...props} />;
                  })}
                </Group>
              );
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Paper;
