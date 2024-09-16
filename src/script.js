const tabuleiro = document.getElementById('board2');

function appendBlockTo(parent, childClass) {
    const element = document.createElement('div');
    element.classList.add(childClass);
    parent.append(element);
    
    return element;
}

function createBoard(numberOfRows, numberOfCollumns) {
    for(let k=0; k < numberOfRows; k++) {
        const linha = appendBlockTo(tabuleiro, 'row');
        
        for(let i=0; i < numberOfCollumns; i++) {
            appendBlockTo(linha, 'cell');
        }
    }
}

createBoard(6, 6);