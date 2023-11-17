import React from 'react';
import { Buitton, Typography } from '@material-ui/core';
import { Link } 'react-router-dom';

function Editor () {
  return (
    <div>
      <Typography variant="h4">Graffiti Wall Art Editor</Typography>
      {/* Your existing Editor Comoponent code */}
      <Link to="/drawing">
        <Button variant="contained" color="primary">
          Start Drawing
        </Button>
        </Link>
    </div>
  );
}

export default Editor;
