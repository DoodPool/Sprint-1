'use strict'

const MINE = '💣'
var gBoard

function onInit() {
    gBoard = buildBoard()
    renderBoard(gBoard, '.board-container')
    // console.log(gBoard)

}

function buildBoard() {
    const SIZE = 4
    var board = []
    // var counter = 1

    for (var i = 0; i < SIZE; i++) {
        board[i] = []
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 4,
                isShown: false,
                isMine: false,
                isMarked: true,
                // counter: counter++
            }
        }
    }
    board[1][2].isMine = true
    board[3][0].isMine = true
    // for (var i = 0; i < 2; i++) {
    //     var randCell = getEmptyCell(board)
    //     board[randCell.i][randCell.j].isMine = true
    // }

    // console.log(board)
    return board
}

function renderBoard(mat, selector) {

    var strHTML = '<table class="board"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            var cell = mat[i][j]
            // console.log(cell)
            setMinesNegsCount(gBoard, i, j)

            if (cell.isMine) {
                cell = MINE
            } else {
                cell = cell.minesAroundCount
            }

            const className = 'cell-' + i + '-' + j
            strHTML += `<td class="${className}" onclick="onCellClicked(this, ${i}, ${j})"><span class="hide">${cell}</span></td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

function setMinesNegsCount(board, rowIdx, colIdx) {
    var minesCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            // console.log(currCell)
            if (currCell.isMine) {
                minesCount++
            }

        }
    }
    board[rowIdx][colIdx].minesAroundCount = minesCount
}

function onCellClicked(elCell, rowIdx, colIdx) {
    var currCell = gBoard[rowIdx][colIdx]
    if (currCell.isShown) return

    currCell.isShown = true

    var elBtn = elCell.querySelector('.hide')
    elBtn.classList.remove("hide")
}

