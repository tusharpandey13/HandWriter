import React from 'react';

import './footer.scss';

const Footer = props => {
  return (
    <div className='F-C'>
      <div className='contact-C'>
        <section>
          <span>Like this page? Consider giving a</span>
          {` `}
          <a className='link' href='https://github.com/tusharpandey13/portfolio-site'>
            star on github!
          </a>
        </section>
        <div className='c-sep'></div>
        <section>
          <span>Contact me:</span>
          {` `}
          <a className='link' href='mailto:tusharpandey13@gmail.com'>
            tusharpandey13@gmail.com
          </a>
        </section>
      </div>
      <div className='footer'>
        <start>
          <a href='https://github.com/tusharpandey13/portfolio-site/blob/master/LICENSE'>MIT License</a>
        </start>
        <middle>
          {/* <span>Hand crafted using </span> */}
          <span role='img' aria-labelledby='fire'>
            🔥
          </span>
          {/* <span> and SCSS</span> */}
        </middle>
        <end>2020</end>
      </div>
    </div>
  );
};

export default Footer;
