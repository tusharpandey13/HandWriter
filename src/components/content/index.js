import React, { useReducer, useEffect } from 'react';
import TextInput from './textinput';
import Paper from './paper';
import Controls from './controls';
import { initialState, reducer } from './store';
// import { useLocalStorage } from 'react-use';

import './content.scss';

const Content = props => {
  const [store, dispatch] = useReducer(reducer, initialState);
  return (
    <div className='C-content'>
      <TextInput store={store} dispatch={dispatch}></TextInput>
      <Paper store={store} dispatch={dispatch}></Paper>
      <Controls store={store} dispatch={dispatch} initialState={initialState}></Controls>
    </div>
  );
};

export default Content;
