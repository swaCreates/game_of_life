import React, {useState, useCallback, useRef} from 'react';

import produce from 'immer';

const numRows = 30 // how I want grid to look
const numCols = 30 // (potential ref of cells)

export default function Grid() {
    const [grid, setGrid] = useState(() => { // will only run once, once initialized
        const rows = [];
        for(let i = 0; i < numRows; i++){
            rows.push(Array.from(Array(numCols), () => 0)) // Array(len of arr) --> make all c dead
        };

        return rows
    });

    const [simulation, setSimulation] = useState(false);

    const simulationRef = useRef(simulation); // need to hold and store original simulation reference
    simulation.current = simulationRef;

    const runSimulation = useCallback(() => { // useEffect type of hook
        if(!simulation.current){
            return;
        };
        // simulate
        setGrid(currGrid => {
            return produce(currGrid, gridCopy =>{
                for (i = 0; i < numRows; i++) {
                    for (j = 0; j < numCols; j++) {
                        let neighbors = 0;
                    };
                };
            });
        });
        setTimeout(runSimulation, 500);
    }, []);

    const run = () => {
        setSimulation(!simulation);
        if(!simulation){

        }
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
                        const newGrid = produce(currGrid, gridCopy => { // helps make copy of grid (immutable)
                            gridCopy[i][j] = currGrid[i][j] ? 0 : 1; // if it's currently alive then make it dead (toggle)
                        });
                        setGrid(newGrid);
                    }}
                    style={{
                        backgroundColor: currGrid[i][j] ? 'purple' : undefined}} className='cells'>
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
