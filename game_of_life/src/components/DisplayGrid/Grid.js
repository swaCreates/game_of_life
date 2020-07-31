import React, {useState, useCallback, useRef} from 'react';

import produce from 'immer';

const numRows = 30 // how I want grid to look
const numCols = 30 // (potential ref of cells)

const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
];

// think of center node as arr
// helps cell shift to neighboring cells

export default function Grid() {
    const [grid, setGrid] = useState(() => { // will only run once, once initialized
        const rows = [];
        for(let i = 0; i < numRows; i++){
            rows.push(Array.from(Array(numCols), () => 0)) // Array(len of arr) --> make all c dead
        };

        return rows
    });

    const [simulation, setSimulation] = useState(false);

    // Helper functions ////////

    const simulationRef = useRef(simulation); // need to hold and store original state simulation reference
    simulationRef.current = simulation;

    const runSimulation = useCallback(() => { // useEffect type of hook
        if(!simulation.current){ // if no simulation return
            return;
        };

        // simulate
        setGrid(currGrid => {
            return produce(currGrid, gridCopy => {
                for (let i = 0; i < numRows; i++) {
                    for (let j = 0; j < numCols; j++) {
                        let neighbors = 0;
                        operations.forEach(([x, y]) => { // for x and y axis
                            let newI = i + x;
                            let newJ = j + y;
                            if(newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols){ 
                                // helps keeping from going out of bounds
                                neighbors += currGrid[newI][newJ] // if we have a live cell add +1 to neighbors
                            };
                        });

                        // currGrid[i][j] && gridCopy[i][j] === cell
                        // it references the value of the cell either (0 or 1)

                        if(neighbors < 2 || neighbors > 3){ 
                            // fewer than 2 or more than 3 cells die
                            // references rule 1 and rule 3
                            gridCopy[i][j] = 0; // cell dies
                        } else if(currGrid[i][j] === 0 && neighbors === 3){
                            // references rule 4
                            gridCopy[i][j] = 1; // cell comes alive
                        };
                    };
                };
            });
        });

        setTimeout(runSimulation, 500);
    }, []);

    const run = () => { // function to run sim when clicked on button below
        setSimulation(!simulation);

        if(!simulation){
            simulationRef.current = true; // since initial is false we must toggle to true
            runSimulation();
        };
    };

    /////////// //////////

    return (
        <>
            <div className='grid-container'>
                {/* rendering grid on screen */}
                {grid.map((rows, i) => 
                    rows.map((col, j) => 
                    <div 
                    key={`${i}-${j}`} 
                    onClick = {() => {
                        const newGrid = produce(grid, gridCopy => { // helps make copy of grid (immutable)
                            gridCopy[i][j] = grid[i][j] ? 0 : 1; // if cell currently alive then make it dead (toggle)
                        });
                        setGrid(newGrid);
                    }}
                    style={{
                        backgroundColor: grid[i][j] ? 'purple' : 'white'}} className='cells'>
                    </div>)
                )}
            </div>
            <div className='control-panel'>
                <button onClick={run} className='start'>{simulation ? 'Stop' : 'Start'}</button>
                <button className='randomize'>Randomize</button>
            </div>
        </>
    );
};
