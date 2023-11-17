// Pixel.js

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  pixel: {
    width: '1.5rem',
    height: '1.5rem',
    border: '1px solid #ddd',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: '#ddd',
    },
  },
}));

function Pixel({ selectedColor }) {
  const [pixelColor, setPixelColor] = useState('#fff');
  const [canChangeColor, setCanChangeColor] = useState(true);

  const applyColor = () => {
    setPixelColor(selectedColor);
    setCanChangeColor(false);
  };

  const resetColor = () => {
    if (canChangeColor) {
      setPixelColor('#fff');
    }

    setCanChangeColor(true);
  };

  return (
    <div
      className={classes.pixel}
      style={{ backgroundColor: pixelColor }}
      onClick={applyColor}
      onMouseEnter={(event) => {
        if (event.buttons === 1) {
          applyColor();
        } else {
          resetColor();
        }
      }}
    ></div>
  );
}

export default Pixel;
