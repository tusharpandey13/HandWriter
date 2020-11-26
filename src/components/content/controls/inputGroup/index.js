import React from 'react';

import './inputGroup.scss';

const InputGroup = props => {
  const dispatchChange = e => {
    props.dispatch({
      type: 'CHANGECOMMONCONFIG',
      commonConfig: {
        ...props.store.commonConfig,
        [props.name]: parseFloat(e.target.value),
      },
    });
  };
  return (
    <div className='input-C form-group'>
      <div className={`label`}>{props.name}</div>
      <span>{Math.abs(parseFloat(props.store.commonConfig[props.name]))}</span>

      <input
        className='slider'
        type='range'
        min={props.min}
        max={props.max}
        onChange={dispatchChange}
        defaultValue={props.store.commonConfig[props.name]}
        step={props.step ?? 1}
        // value={props.store.commonConfig[props.name]}
      />
    </div>
  );
};

export default InputGroup;
