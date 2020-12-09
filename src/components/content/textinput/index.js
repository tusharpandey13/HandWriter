import React from 'react';
import './textinput.scss';

const TextInput = props => {
  const dispatchTextChanges = e => {
    props.dispatch({
      type: 'CHANGETEXT',
      text: e.target.value,
    });
  };
  const dispatchImageURLSChanges = urls => {
    props.dispatch({
      type: 'ADDIMAGEURLS',
      imageURLS: urls,
    });
  };

  return (
    <div className='C-textinput'>
      <textarea
        placeholder='Enter Text You want to be written on paper. Paste an image here to add to paper.'
        // id='dataField'
        // onKeyUp='textChanged(this.value)'
        cols='50'
        wrap='hard'
        onChange={dispatchTextChanges}
        onPaste={e => {
          // console.log(e.clipboardData);
          if (e.clipboardData) {
            var items = e.clipboardData.items;
            if (!items) return;

            //access data directly
            var is_image = false;
            let urls = [];
            for (var i = 0; i < items.length; i++) {
              if (items[i].type.indexOf('image') !== -1) {
                //image
                var blob = items[i].getAsFile();
                var source = URL.createObjectURL(blob);
                urls.push({
                  x: 100,
                  y: 100,
                  src: source,
                  id: props.store.imageURLS.length,
                });
                is_image = true;
              }
            }
            if (is_image === true) {
              e.preventDefault();
            }
            dispatchImageURLSChanges(urls);
          }
        }}
      ></textarea>
    </div>
  );
};

export default TextInput;
