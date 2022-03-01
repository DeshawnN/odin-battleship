function renderGameBoard(boardData, boardType, html) {
    let board = document.createElement('div');
    board.classList.add('grid');

    const gameboard = boardData.board; 
    for (let rows = 0; rows < gameboard.length; rows++) {
        
        const row = document.createElement('div');
        row.classList.add('rows', 'grid');
        for (let cols = 0; cols < gameboard.length; cols++) {
            let col = document.createElement('div');
            col.classList.add('grid-column');
            col.setAttribute('data-coordinates', `${rows},${cols}`);

            const coordData = boardData.getCoordInfo(rows,cols);

            if (boardType == 'player') {
                if (coordData) {
                    if (coordData.ship) {
                        const shipIndicator = document.createElement('div');
                        shipIndicator.classList.add('ship');
                        col.appendChild(shipIndicator);
                    }
                }
            }

            if (coordData) {
                if (coordData.missed) {
                    if (coordData.missed) {
                        const missedIndicator = document.createElement('div');
                        missedIndicator.classList.add('indicator', 'missed');
                        col.appendChild(missedIndicator);
                    }
                }

                if (coordData.ship) {
                    if (coordData.ship.hits[coordData.position].hit) {
                        const hitIndicator = document.createElement('div');
                        hitIndicator.classList.add('indicator', 'hit');
                        col.appendChild(hitIndicator);
                    }
                }
            }

            row.appendChild(col);
        }
        board.appendChild(row);
    }

    html.innerHTML = '';
    html.appendChild(board);
}

export default {
    renderGameBoard,
}