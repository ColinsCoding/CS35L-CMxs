import React, { useRef } from 'react';
import Row from './Row';
import { exportComponentAsPNG, exportComponentAsJPEG } from 'react-component-export-image';
import html2canvas from 'html2canvas';
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

import '../styles/drawingPanel.css';


// Used to create an entirely new post
function DrawingPanel({ width, height, selectedColor }) {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const createPost = (user_x, likes, image) => {
    const post_data = {
      user: user_x,
      likes,
      image
    };
    console.log(post_data)
    axios
    .post('http://localhost:5555/posts', post_data)
    .then(() => {
      navigate('/feed');
    })
    .catch((error) => {
      alert('Error')
      console.log(error);
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
          onClick={() => exportComponentAsJPEG(componentRef)}
      > Export as JPG
      </button>
      <button 
        className='button-outline'
          onClick={ async () => {
            const element  = componentRef.current;
            const canvas = await html2canvas(element);
            const data = canvas.toDataURL('image/png');
            if (user){
              createPost(user.username, 0, data);
            }
            else {
              alert('You must be logged in to create a post!');
              return;
            }
          }}
      > POST TO WALL
      </button>
    </div>
  )
}

export default DrawingPanel;