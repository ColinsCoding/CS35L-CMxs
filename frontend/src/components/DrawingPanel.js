import React, { useRef, useState } from 'react';
import Row from './Row';
import { exportComponentAsPNG, exportComponentAsJPEG } from 'react-component-export-image';
import html2canvas from 'html2canvas';
import axios from 'axios'

import '../styles/drawingPanel.css';



function DrawingPanel({ width, height, selectedColor }) {
  const createPost = (user, likes, image) => {
    const post_data = {
      user,
      likes,
      image
    };
    console.log(post_data)
    axios
    .post('http://localhost:5555/posts', post_data)
    .then(() => {

    })
    .catch((error) => {
      alert('Error')
    });
  };
  const componentRef = useRef();
  
  
  let rows = [];

  for (let i = 0; i < height; i++) {
    rows.push(<Row key={i} width={width}  selectedColor={selectedColor} />)
  }

  return (
    <div id="drawing-panel">
      <div id="pixels" ref={componentRef}>
        {rows}
      </div>
      <button 
        className='button-outline'
          onClick={() => exportComponentAsPNG(componentRef)}
      > Export as PNG
      </button>
      <button 
        className='button-outline'
       // onClick={() => exportComponentAsJPEG(componentRef)}
      > Export as JPG
      </button>
      <button 
        className='button-outline'
          onClick={ async () => {
            const element  = componentRef.current;
            const canvas = await html2canvas(element);
            const data = canvas.toDataURL('image/png');
            createPost("placeholder_user", 0, data)
          }}
      > POST TO WALL
      </button>
    </div>
  )
}

export default DrawingPanel;