import React from 'react';

export default function Rules() {
    return (
        <div className='rules-container'>
            <div>
                <section>
                    <h2>Rules of the Game</h2>
                    <p><li> Any live cell with fewer than two live neighbours dies, as if by underpopulation</li></p>
                    <p><li>Any live cell with two or three live neighbours lives on to the next generation</li></p>
                    <p><li>Any live cell with more than three live neighbours dies, as if by overpopulation</li></p>
                    <p><li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction</li></p>
                </section>
            </div>
        </div>
    )
}
