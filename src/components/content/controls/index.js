import React, { useEffect, useRef, useState } from 'react';
import HomeHeader from '../../homeheader';
import { Collapse } from 'react-bootstrap';
import InputGroup from './inputGroup';
import InputContainer from './inputContainer';
import './controls.scss';
import { uploadSvg, randomSvg, downloadSvg, trashSvg, clearSvg } from './svgs';

const downloadURI = (uri, name) => {
  const link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const Controls = props => {
  const [pageCtr, setPageCtr] = useState(0);

  const dispatchImageChange = e => {
    props.dispatch({
      type: 'ADDBGURLS',
      bgURLS: Array.from(e.target.files).map(e1 => URL.createObjectURL(e1)),
    });
    props.dispatch({
      type: 'CHANGEBGURLINDEX',
      bgURLindex: props.store.bgURLindex + 1,
    });
  };
  const dispatchBgURLIndexChange = e => {
    props.dispatch({
      type: 'CHANGEBGURLINDEX',
      bgURLindex: Math.max(1, (props.store.bgURLindex + 1) % props.store.bgURLS.length),
    });
  };
  const dispatchBgURLIndexReset = e => {
    props.dispatch({
      type: 'RESETBGURLINDEX',
    });
    props.dispatch({
      type: 'RESETBGURLS',
    });
  };

  const dispatchResetPage = e => {
    props.dispatch({
      type: 'RESETBGURLINDEX',
    });
    props.dispatch({
      type: 'CHANGETEXT',
      text: '',
    });
    props.dispatch({
      type: 'RESETIMAGEURLS',
    });
  };

  const fileRef = useRef();

  return (
    <div className='C-controls'>
      <HomeHeader title={`HandWriter`} thickborder={``} header />
      <div className='C-inputs bg-white pl-1 pr-1'>
        <InputContainer title='Paper' open={true}>
          <button className='btn btn-light buttoncontrol col' onClick={dispatchResetPage}>
            <span>Clear Page</span>
            {clearSvg}
          </button>
          <input type='file' accept='image/*' onChange={dispatchImageChange} ref={fileRef} hidden />
          <button
            className='btn btn-dark buttoncontrol col'
            onClick={e => fileRef.current && fileRef.current.click()}
          >
            <span>Upload Custom Background</span>
            {uploadSvg}
          </button>
          {props.store.bgURLS.length > 1 && (
            <div className='row pt-0 pb-0 pl-1 pr-1 col'>
              <button
                className='btn btn-success buttoncontrol col mr-1'
                onClick={dispatchBgURLIndexChange}
                disabled={props.store.bgURLS.length <= 2}
              >
                <span>Change Background</span>
                {randomSvg}
              </button>
              <button
                className='btn btn-danger buttoncontrol col-auto ml-1'
                onClick={dispatchBgURLIndexReset}
              >
                {/* <span>Reset Background</span> */}
                {trashSvg}
              </button>
            </div>
          )}
          <button
            className='btn btn-primary buttoncontrol col'
            onClick={e => {
              e.preventDefault();
              setPageCtr(pageCtr + 1);
              downloadURI(
                props.store.stageRef.current.toDataURL({
                  mimeType: 'image/png',
                  quality: 1,
                  pixelRatio: 2,
                }),
                `handwriter-${pageCtr}-${Date.now()}`
              );
            }}
          >
            <span>Download</span>
            {downloadSvg}
          </button>
        </InputContainer>
        <InputContainer title='Controls'>
          <InputGroup name='scale' min={15} max={30} step={0.25} {...props}></InputGroup>
          <InputGroup name='top' min={-200} max={0} step={0.5} {...props}></InputGroup>
          <InputGroup name='left' min={-200} max={0} {...props}></InputGroup>
          <InputGroup name='linespacing' min={0} max={200} {...props}></InputGroup>
          <InputGroup name='width' min={180} max={600} step={10} {...props}></InputGroup>
          <div className='alert alert-light mb-0 h6' role='alert'>
            Tip: Drag the content to reposition, paste images into the editor to add
          </div>
        </InputContainer>
      </div>
    </div>
  );
};

export default Controls;
