import React from 'react';
import './App.scss';

import Grid from './components/DisplayGrid/Grid.js';
import NavBar from './components/Nav/NavBar.js'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Grid />
    </div>
  );
}

export default App;
