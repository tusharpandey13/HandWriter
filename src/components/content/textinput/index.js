import React from 'react';
import './textinput.scss';

const TextInput = props => {
  const dispatchTextChanges = e => {
    props.dispatch({
      type: 'CHANGETEXT',
      text: e.target.value,
    });
  };

  return (
    <div className='C-textinput'>
      <textarea
        placeholder='Enter Text You want to be written on a paper....'
        // id='dataField'
        // onKeyUp='textChanged(this.value)'
        cols='50'
        wrap='hard'
        onChange={dispatchTextChanges}
      ></textarea>
    </div>
  );
};

export default TextInput;
