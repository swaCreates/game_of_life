import React, {useState} from 'react';

const numRows = 50 // how I want grid to look
const numCols = 50

export default function Grid() {
    const [grid, setGrid] = useState(() => { // will only run once, once initialized
        const rows = [];
        for(let i = 0; i < numRows; i++){
            rows.push(Array.from(Array(numCols), () => 0)) // Array(len of arr) --> make all c dead
        };

        return rows
    });

    return (
        <div>
            {/* rendering grid on screen */}
            {grid.map((rows, i) => 
                rows.map((col, j) => 
                <div 
                key={`${i}-${j}`} 
                style={{
                    backgroundColor: grid[i][j] ? 'purple' : undefined}} className='grid'>
                </div>)
            )}
        </div>
    );
};
