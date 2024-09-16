buildGameBoard(8, 8);

function buildGameBoard(numberOfRows, numberOfCollumns) {
    const board = document.getElementById('board2');

    for(let k=0; k < numberOfRows; k++) {
        const row = document.createElement('div');
        row.classList.add('row');
        board.append(row);
        
        for(let i=0; i < numberOfCollumns; i++)  {
            const celula = document.createElement('div');
            celula.classList.add('cell');
            row.append(celula);

            if(k == 0 || k == numberOfRows-1 || i == 0 || i == numberOfCollumns-1) {
                celula.classList.add('empty');
            }

            /*
            if(k > 0 && k < numberOfRows-1 && i > 0 && i < numberOfCollumns-1) {
                celula.classList.add('empty');
            } */

            /*
            if(k <= i) {
                celula.classList.add('empty');
            } */

            /*
            if(k + i < numberOfCollumns-1) {
                celula.classList.add('empty');
            } */

            /*
            if(k + i < numberOfRows-1) {
                celula.classList.add('empty');
            } */
        }
    }
}