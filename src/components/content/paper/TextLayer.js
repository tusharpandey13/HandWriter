import React, { useRef, useEffect, useState } from 'react';
import { Layer, Group } from 'react-konva';
import { initialState, dimMap } from '../store';
import CharImg from './CharImg';

import TransformableGroup from './TransformableGroup';

const rand = (min, max) => Math.random() * (max - min) + min;

const TextLayer = props => {
  const [textData, setTextData] = useState([]);
  const textLayerRef = useRef();

  useEffect(() => {
    const textlayout = text => {
      let lastspace = false;
      let hyphenflag = -1;
      let tmpx = rand(-4, 4);
      let tmpy = rand(-1, 0);
      const tmprotation = rand(-10, 10);
      let out = [[]];
      for (let i = 0; i < text.length; i += 1) {
        if (
          !`0123456789!"#$%&'()*+,-./:;<=>?@[\]^_{|}ABCDEFGHIJKLMNOPQRSTUVWXYZacemnorsuvwxbdfhijkltgpqyz \n\``.includes(
            text[i]
          )
        )
          continue;
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
          // console.log(`outputting : ${text[i]}`);

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
          let currentchar = hyphenflag === i ? '-' : text[i];
          lastspace = false;
          out[out.length - 1].push({
            char: currentchar,
            x: tmpx + dimMap[currentchar][4],
            y: tmpy,
            width: dimMap[currentchar][0],
            height: dimMap[currentchar][1],
            scaleX: scaleX,
            scaleY: dimMap[currentchar][7],
            opacity: rand(0.875, 1),
            rotation: rand(0, tmprotation),
            offsetY:
              -props.store.commonConfig.linespacing +
              dimMap[currentchar][1] * dimMap[currentchar][7] -
              dimMap[currentchar][3],
          });
          tmpx +=
            (dimMap[currentchar][0] * props.store.commonConfig.scale * scaleX) / 100 +
            dimMap[currentchar][5];
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
    textLayerRef.current.draw();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.store.text,
    props.store.commonConfig.scale,
    props.store.commonConfig.width,
    props.store.commonConfig.cols,
  ]);
  return (
    <Layer
      imageSmoothingEnabled={true}
      offsetY={props.store.commonConfig.top}
      offsetX={props.store.commonConfig.left}
      ref={textLayerRef}
      draggable={true}
      listening={true}
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
        let tmpy = (i0 * props.store.commonConfig.linespacing * props.store.commonConfig.scale) / 100;
        return (
          <TransformableGroup
            key={i0}
            offsetY={-tmpy}
            isSelected={`text${i0}` === props.selectedId}
            onSelect={() => props.selectShape(`text${i0}`)}
            {...props}
          >
            {/* <Group key={i0} listening={true} draggable={true}> */}
            {e0.map((e1, i1) => {
              return <CharImg image={props.store.chars[e1.char]} i1={i1} e1={e1} {...props} />;
            })}
            {/* </Group> */}
          </TransformableGroup>
        );
      })}
    </Layer>
  );
};
export default TextLayer;
// offsetY={-tmpy}
