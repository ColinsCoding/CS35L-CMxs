import React, { useState } from 'react';
import { CirclePicker } from 'react-color';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DrawingPanel from './UpdateDrawingPanel';
import Navbar from './Navbar.js'

import '../styles/editor.css';

// Used to draw over another user's posts
function UpdateEditor() {
  const [canvasWidth, setCanvasWidth] = useState(16);
  const [canvasHeight, setCanvasHeight] = useState(16);
  const [hideOptions, setHideOptions] = useState(false);
  const [hideDrawingCanvas, setHideDrawingCanvas] = useState(true);
  //const [buttonText, setButtonText] = useState('Start drawing');
  const [selectedColor, setSelectedColor] = useState('#f44336');

  const widthHandler = (e) => {
    setCanvasWidth(e.target.value);
  };

  const heightHandler = (e) => {
    setCanvasHeight(e.target.value);
  };

  const initializeCanvas = () => {
    setHideOptions(!hideOptions);
    setHideDrawingCanvas(!hideDrawingCanvas);
  };

  const changeColorHandler = (color) => {
    setSelectedColor(color.hex);
  };

  const handleGoBack = () => {
    setHideOptions(false);
    setHideDrawingCanvas(true);
  };
  const [user, setUser] = useState('');
  const [image, setImage] = useState('');
  const {id} = useParams();
  const navigate = useNavigate();
  axios.get(`http://localhost:5555/posts/${id}`)
  .then((response) => {
    if (!response){
        throw new Error("Post id does not exist!");
    }
    setUser(response.data.user);
    setImage(response.data.image);
  }).catch((error) => {
    alert("Post does not exist!")
    navigate("/feed")
  });

  return (
    <div>
      <Navbar/>
      <div id="editor">
        <h1>Editing: <b>{user}</b>'s Post</h1>
        {hideDrawingCanvas && <h2>Enter Your Canvas Dimensions</h2>}
        {hideDrawingCanvas && (
        <div id="options">
          <div className='option'>
            <input 
              type='number' 
              className='panelInput' 
              defaultValue={canvasWidth} 
              onChange={widthHandler}
            />
            <span>Width</span>
          </div>
          <div className='option'>
            <input 
              type='number' 
              className='panelInput' 
              defaultValue={canvasHeight} 
              onChange={heightHandler}
            />
            <span>Height</span>
          </div>
        </div> )}

        {hideDrawingCanvas && (
          <button 
            className='button'
            onClick={initializeCanvas}
          > Start Drawing
          </button>
        )}



        {hideOptions && (
          <>
            <button 
              className='button-back'
              onClick={handleGoBack}
            > Go back home
            </button>


            <CirclePicker 
              color={selectedColor} 
              onChangeComplete={changeColorHandler}
            />

            <DrawingPanel 
              width={canvasWidth}
              height={canvasHeight}
              selectedColor={selectedColor}
            />  
          </>
        )}

      </div> 
    </div>
  )
}

export default UpdateEditor;