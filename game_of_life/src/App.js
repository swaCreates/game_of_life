import React from 'react';
import './App.scss';

import Grid from './components/DisplayGrid/Grid.js';

function App() {
  return (
    <div className="App">
      <header>
        <h1 className='navh1'>John Conway's Game Of Life</h1>
      </header>
      <Grid />
    </div>
  );
}

export default App;
