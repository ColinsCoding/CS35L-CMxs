import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SketchPicker } from 'react-color';

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
  colorPicker: {
    position: 'absolute',
    zIndex: 1,
    marginTop: '2rem',
  },
}));

function Pixel() {
  const classes = useStyles();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [pixelColor, setPixelColor] = useState('#fff');
  const [selectedColor, setSelectedColor] = useState('#000'); 

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const applyColor = (color) => {
    setPixelColor(color.hex);
    setSelectedColor(color.hex);
    setShowColorPicker(false);
  };

  const resetColor = () => {
    setPixelColor('#fff');
    setSelectedColor('#000'); 
    setShowColorPicker(false);
  };

  return (
    <div
      className={classes.pixel}
      style={{ backgroundColor: pixelColor }}
      onClick={toggleColorPicker}
    >
      {showColorPicker && (
        <div className={classes.colorPicker}>
          <SketchPicker color={selectedColor} onChange={applyColor} />
        </div>
      )}
    </div>
  );
}

export default Pixel;
