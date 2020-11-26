import React, { useRef, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { expandSvg } from '../svgs';
import './inputcontainer.scss';

const InputContainer = props => {
  const [open, setOpen] = useState(props.open ?? false);

  return (
    <div className='card rounded mt-1 mb-1'>
      <div className='card-header flexrow'>
        {props.title}
        <button className='btn btn-secondary' onClick={() => setOpen(!open)}>
          {/* <span>{open ? 'Close' : 'Open'}</span> */}
          {expandSvg}
        </button>
      </div>
      <Collapse in={open}>
        <div className='card-body'>{props.children}</div>
      </Collapse>
    </div>
  );
};

export default InputContainer;
