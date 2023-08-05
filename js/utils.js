'use strict'

function renderBoard(mat, selector) {

    var strHTML = '<table class="board"><tbody>'
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            var cell = mat[i][j]
            var currChar = ''
            setMinesNegsCount(gBoard, i, j)

            if (cell.isShown && !gIsFirstTurn) return
            
            if (cell.isMine) {
                currChar = MINE
            } else {
                currChar = cell.minesAroundCount
            }

            const className = 'cell-' + i + '-' + j
            strHTML += `<td class="${className}" onclick="onCellClicked(this, ${i}, ${j})" 
            oncontextmenu="onCellMarked(this, ${i}, ${j})">
            <span class="hide">${currChar}</span></td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getEmptyCell(board) {
    var emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var currCell = board[i][j]
            if (currCell.isMine === false && currCell.isShown === false) emptyCells.push({ i, j })
        }
    }
    var randCell = emptyCells[getRandomInt(0, emptyCells.length - 1)]
    return randCell
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.addEventListener("contextmenu", e => e.preventDefault())

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////