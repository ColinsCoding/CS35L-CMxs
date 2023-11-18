import React, { useState } from 'react';
import { Button, Typography, Link, Grid, MenuItem, Select, FormControl, InputLabel, IconButton } from '@material-ui/core';
import { Edit as EditIcon, Clear as ClearIcon, CropFree as CropFreeIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  

  controlsContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  select: {
    marginLeft: theme.spacing(2),
  },
}));

function Editor() {
  const classes = useStyles();
  const [brushSize, setBrushSize] = useState(1);
  const [eraserMode, setEraserMode] = useState(false);

  const handleBrushSizeChange = (event) => {
    setBrushSize(event.target.value);
  };

  const toggleEraserMode = () => {
    setEraserMode(!eraserMode);
  };

  return (
    <div className={classes.editorContainer}>
     
      
      <div className={classes.controlsContainer}>
        <Typography variant="body1" color="textSecondary">
          Brush Size:
        </Typography>
        <FormControl variant="outlined" className={classes.select}>
          <InputLabel id="brush-size-label">Size</InputLabel>
          <Select
            labelId="brush-size-label"
            id="brush-size-select"
            value={brushSize}
            onChange={handleBrushSizeChange}
            label="Size"
          >
            <MenuItem value={1}>Small</MenuItem>
            <MenuItem value={3}>Medium</MenuItem>
            <MenuItem value={5}>Large</MenuItem>
          </Select>
        </FormControl>
        <IconButton color={eraserMode ? 'secondary' : 'default'} onClick={toggleEraserMode}>
          <CropFreeIcon />
        </IconButton>
        <IconButton onClick={clearCanvas}>
          <ClearIcon />
        </IconButton>
      </div>

     
