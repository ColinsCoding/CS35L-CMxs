import React, { useState } from 'react';
import DrawingPanel from './DrawingPanel';
import Editor from './components/Editor';
import '../styles/wall.css';

function Wall({height, weidth, selectedColor, UserDrawing}) {
//Define Variables and States 

//Define Functions
height = 16
width = 16

rows = []

for (let i = 0; i < height; i++) {
    rows.push(<Row key={i} width={width}  selectedColor={selectedColor} />)
  }

    return (
      <div className="Wall">
      </div>
    );
  }
  
  export default App;