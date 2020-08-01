import React from 'react';
import './App.scss';

import Grid from './components/DisplayGrid/Grid.js';
import Rules from './components/Rules';
import About from './components/About';

function App() {
  return (
    <div className="App">
      <header>
        <h1 className='h1'>John Conway's Game Of Life</h1>
      </header>
      <Grid />
      <div className='flex'>
        <Rules/>
        <About/>
      </div>
    </div>
  );
}

export default App;
