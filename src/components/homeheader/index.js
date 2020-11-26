import React, { useState } from 'react';
import { penSvg, ghSvg } from '../content/controls/svgs';
import './homeheader.scss';

const HomeHeader = props => {
  return (
    <nav className='navbar navbar-dark bg-primary'>
      <div className='C-title'>
        {penSvg}
        <span className='navbar-brand' href='#'>
          HandWriter
        </span>
      </div>
      <div className='C-title'>
        <a href='https://github.com/tusharpandey13/Assignment_Writer' target='_blank' rel='noreferrer'>
          <button className='btn btn-light text-black'>{ghSvg}</button>
        </a>
      </div>
    </nav>
  );
};

export default HomeHeader;
