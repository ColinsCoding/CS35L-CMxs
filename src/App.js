import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Editor from './Editor';
import DrawingPanel from './DrawingPanel';

function App () {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Editor} />
        <Route path="/" component={DrawingPanel} />
      </Switch>
    </Router>
  );
}

export default App; 
