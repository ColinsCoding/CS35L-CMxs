// frontend/src/components/Pixel.js

import React, { useState } from 'react';
import '../styles/pixel.css';

function Pixel({ selectedColor }) {
  const [pixelColor, setPixelColor] = useState('#fff');
  const [oldColor, setOldColor] = useState(pixelColor);
  const [canChangeColor, setCanChangeColor] = useState(true);

  const applyColor = () => {
    setPixelColor(selectedColor);
    setCanChangeColor(false);
  };

  const changeColorOnHover = () => {
    setOldColor(pixelColor);  //making a reserved color to the old pixel color
    setPixelColor(selectedColor);
  };

  const resetColor = () => {
    if (canChangeColor) {
      setPixelColor(oldColor);
    }

    setCanChangeColor(true);
  };


  const removeColor = () => {
    setPixelColor('#fff');
  };

  return (
    <div 
      className='pixel' 
      style={{backgroundColor: pixelColor}}
      onClick={applyColor} 
      onMouseEnter={(pressed) => {
        if (pressed.buttons === 1) {
        applyColor();
        } else {
            changeColorOnHover();
        };

      }}

      onMouseLeave={resetColor}
      onDoubleClick={removeColor}

      
    >

    </div>
  )
}

export default Pixel;