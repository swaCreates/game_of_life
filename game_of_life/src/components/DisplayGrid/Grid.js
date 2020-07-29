import React, {useState} from 'react';

import produce from 'immer';

const numRows = 30 // how I want grid to look
const numCols = 30

export default function Grid() {
    const [grid, setGrid] = useState(() => { // will only run once, once initialized
        const rows = [];
        for(let i = 0; i < numRows; i++){
            rows.push(Array.from(Array(numCols), () => 0)) // Array(len of arr) --> make all c dead
        };

        return rows
    });

    const [simulation, setSimulation] = useState(false);

    const run = () =>{
        setSimulation(!simulation);
    };

    return (
        <>
            <div className='grid-container'>
                {/* rendering grid on screen */}
                {grid.map((rows, i) => 
                    rows.map((col, j) => 
                    <div 
                    key={`${i}-${j}`} 
                    onClick = {() => {
                        const newGrid = produce(grid, gridCopy => {
                            gridCopy[i][j] = grid[i][j] ? 0 : 1; // if it's currently alive then make it dead (toggle)
                        });
                        setGrid(newGrid);
                    }}
                    style={{
                        backgroundColor: grid[i][j] ? 'purple' : undefined}} className='cells'>
                    </div>)
                )}
            </div>
            <div className='control-panel'>
                <button onClick={run} className='start'>{simulation ? 'stop' : 'start'}</button>
                <button className='randomize'>randomize</button>
            </div>
        </>
    );
};
