import React from 'react';
import { Button, Typography, Link, Grid } from '@material-ui/core';
import { makeStyles } from '@material.ui/core/styles';
import { Edit as EditIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  editorContainer: {
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    padding: theme.spacing(4), 
  },
  heading: {
    marginBottom: theme.spacing(2), 
    display: 'flex',
    alignItems: 'center', 
  },
  icon: {
    marginRight: theme.spacing(1), 
    fontSize: 2rem',
  },
  startDrawingButton: {
    marginTop: theme.spacing(4), 
    fontSize: '1.2rem', 
    padding: theme.spacing(2, 4),
  },
}));

function Editor() {
  const classes = useStyles(); 

return (
  <div className={classes.editorContainer}>
    <Typography variant="h4" className={classes.heading}>
      <EditIcon className={classes.icon} /> Graffiti Wall Art Editor
  </Typography>
  <Typography variant="body1" color="textSecondary">
    Unleash your creativity and start drawing on the digital canvas!
  <Typography> 
  <Link to="/drawing" style={{ textDecoration: 'none' }}>
    <Button
      variant="contained"
      color="primary"
      className={classes.startDrawingButton}
    >
      Start Drawing
    </Button>
  </Link> 
  <Grid container spacing={3} style={{ marginTop: theme.spacing(4) }}>
{/* Possibility of adding more intractive info*/}
    <Grid item xs={12} sm{6}>
      <div style={{ padding: theme.spacing(3), backgroundColor: '#fff' }}>
        <Typography variant-"h6">Tips for Awesome Art</Typography>
        <Typography variant="body2" color="textSecondary">
          Get creative with colors, experiment with different brushes, and 
          don't forget to save your masterpiece!
            </Typography>
        </div>
      </Grid>
      <Grid item xs={12} sm={6}>
            {/* Can add mdore info here */}
      </Grid}
    </Grid}
  </div>
  );
}

export default Editor; 
  
