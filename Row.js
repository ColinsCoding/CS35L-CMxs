// Row.js

import React from 'react';
import Pixel from './Pixel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    width: 'fit-content',
  },
}));

function Row({ width, selectedColor }) {
  const classes = useStyles();

  let pixels = [];

  for (let i = 0; i < width; i++) {
    pixels.push(<Pixel key={i} selectedColor={selectedColor} />);
  }

  return <div className={classes.row}>{pixels}</div>;
}

export default Row;
