import React, {useState, useCallback, useRef} from 'react';
import {ButtonToolbar, Dropdown, DropdownButton} from 'react-bootstrap';

import produce from 'immer';

let numRows = 25 // how I want grid to look
let numCols = 25 // (potential ref of cells)

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
// helps cell shift to neighboring cells (coordinates)

const emptyGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numCols), () => 0)) // Array(len of arr) --> make all c dead
    };

    return rows
};

export default function Grid() {
    const [numRows, setNumRows] = useState(25)
    const [numCols, setNumCols] = useState(25)
    const [grid, setGrid] = useState(() => { // will only run once, once initialized
        return emptyGrid();
    });

    const [simulation, setSimulation] = useState(false); // is game on or off?

    const initialState = 0;
    const [generation, setGeneration] = useState(initialState); // the count of generations

    const [speed, setSpeed] = useState(500); // game speeds
    
    const [gridSize, setGridSize] = useState(); // changing the grid size

    const handleSelect = evt => {
        setGridSize(evt);
    };

    // Helper functions ////////

    // button functions for grid
    const resetGrid = () => {
        setGrid(emptyGrid());
        setGeneration(initialState); // set generation back to 0
    };

    const randomGrid = () => {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => Math.random() > 0.7 ? 1 : 0)) 
            // if random digit is greater than .7 make cells alive else dead
        };

        setGrid(rows);
    };
    // 

    const simulationRef = useRef(simulation); // need to hold and store original state simulation reference
    simulationRef.current = simulation;

    //
    const runSimulation = useCallback(() => { // useEffect type of hook
        if(!simulationRef.current){ // if no simulation return
            // console.log('no simulation')
            return;
        };

        // console.log('simulation')
        setGeneration((orig) => {
            return orig + 1
        });

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

        setTimeout(runSimulation, speed);
    }, []);
    //

    const run = () => { // function to run sim when clicked on button below
        setSimulation(!simulation);

        if(!simulation){
            simulationRef.current = true; // since initial is false we must toggle to true
            runSimulation();
        };
    };

    const runSimulationTwo = useCallback(() => { // useEffect type of hook
        if (!simulationRef.current) { // if no simulation return
            // console.log('no simulation')
            return;
        };

        // console.log('simulation')
        setGeneration((orig) => {
            return orig + 1
        });

        // simulate
        setGrid(currGrid => {
            return produce(currGrid, gridCopy => {
                for (let i = 0; i < numRows; i++) {
                    for (let j = 0; j < numCols; j++) {
                        let neighbors = 0;
                        operations.forEach(([x, y]) => { // for x and y axis
                            let newI = i + x;
                            let newJ = j + y;
                            if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                                // helps keeping from going out of bounds
                                neighbors += currGrid[newI][newJ] // if we have a live cell add +1 to neighbors
                            };
                        });

                        // currGrid[i][j] && gridCopy[i][j] === cell
                        // it references the value of the cell either (0 or 1)

                        if (neighbors < 2 || neighbors > 3) {
                            // fewer than 2 or more than 3 cells die
                            // references rule 1 and rule 3
                            gridCopy[i][j] = 0; // cell dies
                        } else if (currGrid[i][j] === 0 && neighbors === 3) {
                            // references rule 4
                            gridCopy[i][j] = 1; // cell comes alive
                        };
                    };
                };
            });
        });
    }, []);

    const runNext = () => { // function to run sim when clicked on button below
        setSimulation(!simulation);

        if (!simulation) {
            simulationRef.current = true; // since initial is false we must toggle to true
            runSimulationTwo();
        };
    };

    const colorArr = [
        '#2E0854', '#9B30FF', '#4B0082', '#FFFF99', '#00B3E6',
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
        '#FF99E6', '#CCFF1A', '#FF1A66', '#BF5FFF', '#33FFCC',
        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
        '#551A8B', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

    const fetchRandomColor = () => {
        for(let i = 0; i < colorArr.length; i++){
            const randomColor = colorArr[Math.floor(Math.random() * 16)];
            return randomColor;
        };
    };

    /////////// //////////

    return (
        <>
            <div className='grid-container'>
                {/* rendering grid on screen */}
                <h3>Generation: #{generation}</h3>
                <div className='grid'>
                    {grid.map((rows, i) => 
                        rows.map((col, j) => 
                        <div 
                        key={`${i}-${j}`} 
                        onClick = {() => {
                            if(!simulation){ // if simulation
                                const newGrid = produce(grid, gridCopy => { // helps make copy of grid (immutable)
                                    gridCopy[i][j] = grid[i][j] ? 0 : 1; // if cell currently alive then make it dead (toggle)
                                });
                                setGrid(newGrid);
                            };
                        }}
                        style={{
                            backgroundColor: grid[i][j] ? fetchRandomColor() : 'white'}} className='cells'>
                        </div>)
                    )}
                </div>
            </div>
            <div className='control-panel'>
                <button onClick={run} className='start'>{simulation ? 'Stop' : 'Start'}</button>
                <button onClick={randomGrid} className='randomize'>Randomize</button>
                <button onClick={resetGrid} className='clear'>Clear</button>
                <button onClick={runNext} className='next'>Next</button>
            </div>
        </>
    );
};